'use strict'

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import PouchDB from 'pouchdb-browser'
import SeamlessAuth from 'pouchdb-seamless-auth'
import CryptoJS from 'crypto-js'
// import App from '../App'
import App from "../views/UserProfile/App";
// import RoutesConfig from "../routes/app";
// import App from 'containers/App/App'
// import {filterCases} from '../utils'
import * as CaseActions from '../actions/cases'
import { setAppUnsavedDataStatus } from '../actions/app'
import { dynamicPouchReduxSetDb } from '../store/dynamicPouchReduxMiddleware'

PouchDB.plugin(require('crypto-pouch'))

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

// const indexRoutes = [
//   { path: "/", component: RoutesConfig }
// ];

class AppContainer extends React.Component {
  constructor (props) {
    super(props)

    SeamlessAuth(PouchDB).then(() => {
      const {config, userDb} = this.props
      const {auth} = config.db
      return Promise.all([
        PouchDB.setSeamlessAuthLocalDB(userDb),
        PouchDB.setSeamlessAuthRemoteDB(config.db.users.remote, {auth})
      ])
    }).then(() => {
      this.setState({ busy: false })
      console.log('Pouch SeamlessAuth setup ok')
    }).catch((error) => {
      console.error('Pouch SeamlessAuth setup error', error)
      window.alert('Unable to setup the users db, \n Please to restart the app.')
    })

    this.caseDb = null
    this.remoteCaseDb = null

    this.remotePush = null
    this.remotePull = null
    this.configPull = null
    this.orgUnitsHelper = null

    this.state = {
      waitingUser: null,
      user: null,
      caseDb: null,
      remoteCaseDb: null,
      onlineStatus: props.initialized.configuration ? 'offline' : 'initializing',
      loginErrorVisible: false,
      busy: true
    }

    this.checkLogin = this.checkLogin.bind(this)
    this.logout = this.logout.bind(this)
    this.updateOnlineStatus = this.updateOnlineStatus.bind(this)
    this.startConfigPull = this.startConfigPull.bind(this)
    this.stopConfigPull = this.stopConfigPull.bind(this)
  }

  checkLogin (username, password) {
    this.setState({ busy: true, onlineStatus: 'initializing' })
    const {config, userDb} = this.props

    PouchDB.seamlessLogIn(username, password).then((resp) => {
      /*
        Seamless auth syncs user docs on demand and does not offer a doc sync event
        We need to wait the document to be available before requesting it.
      */
      return new Promise((resolve, reject) => {
        window.setTimeout(() => {
          const id = `org.couchdb.user:${username}`
          userDb.get(id).then((waitingUser) => {
            try {
              const sharedSecretKey = CryptoJS.AES.decrypt(waitingUser.sharedSecretKey, password).toString(CryptoJS.enc.Utf8)
              if (sharedSecretKey && sharedSecretKey.length > 0) {
                resolve({waitingUser, sharedSecretKey})
              } else {
                throw new Error('Data decryption error')
              }
            } catch (error) {
              reject(error)
            }
          })
        }, 4000)
      })
    }).then(({waitingUser, sharedSecretKey}) => {
      const auth = {username, password}
      this.caseDb = new PouchDB(config.db.case.local)
      /*
        Disable crypto-pouch for this to be resolved https://github.com/pouchdb-community/transform-pouch/issues/8
        this.caseDb.crypto(sharedSecretKey)
      */
      this.remoteCaseDb = new PouchDB(config.db.case.remote, {auth})

      // Inform pouch-redux that the database is ready
      this.props.dispatch(dynamicPouchReduxSetDb('caseDb', this.caseDb))
      this.login(waitingUser)
    })
    .catch((error) => {
      console.error('Error while trying to login', error)
      this.loginFail()
    })
  }

  login (waitingUser) {
    this.updateOnlineStatus({waitingUser, loginErrorVisible: false})
  }

  logout () {
    this.updateOnlineStatus({busy: false, user: null, waitingUser: null})
    this.props.dispatch(setAppUnsavedDataStatus(false))
    this.props.dispatch({type: 'LOGOUT'})
  }

  loginFail () {
    this.updateOnlineStatus({busy: false, loginErrorVisible: true})
  }

  isLoggedIn () {
    return !!this.state.user
  }

  updateOnlineStatus (otherState) {
    let onlineStatus = window.navigator.onLine ? 'online' : 'offline'
    this.setState(Object.assign({}, {onlineStatus}, otherState))
  }

  componentWillReceiveProps (nextProps) {
    // Move to dashboard screen only when everything is ready
    if (nextProps.initialized.everything && !this.state.user) {
      this.updateOnlineStatus({busy: false, user: this.state.waitingUser, loginErrorVisible: false})
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.user && this.state.user === null) {
      // User logged out (stop casedb sync)
      this.stopRemotePush()
      this.stopRemotePull()
      Promise.all([this.caseDb.close(), this.remoteCaseDb.close()]).then(() => {
        this.caseDb = null
        this.remoteCaseDb = null
      })
    } else if (prevState.user !== this.state.user) {
      // New user logged in (start casedb sync)
      this.startRemotePush()
      this.startRemotePull()
    }
  }

  componentDidMount () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)

    this.startConfigPull()
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)

    this.stopConfigPull()
  }




  render () {
    return <App {...this.state} {...this.props}
      checkLogin={this.checkLogin}
      loggedIn={this.isLoggedIn()}
      logout={this.logout}
    />
  }

  startConfigPull () {
    console.log('starting remote pull config')
    this.configPull = this.props.configDb.replicate.from(this.props.remoteConfigDb, {
      live: true,
      retry: true
    }).on('complete', () => {
      console.log('Config pull complete')
    }).on('paused', (err) => {
      // If we get error here, we're offline with regards to the database
      // whatever the user agent online status says. Otherwise, check with UA.
      if (err) {
        this.setState({onlineStatus: 'offline'})
      } else {
        this.updateOnlineStatus()
      }
    }).on('active', () => {
      this.setState({onlineStatus: 'syncing'})
    }).on('error', (err) => {
      console.log(err)
    })
  }

  stopConfigPull () {
    this.configPull && this.configPull.cancel()
  }

  startRemotePush () {
    // replicate db
    console.log('starting remote push')
    this.remotePush = this.caseDb.replicate.to(this.remoteCaseDb, {
      live: true,
      retry: true
    }).on('complete', () => {
      console.log('Remote push complete')
    }).on('paused', (err) => {
      // If we get error here, we're offline with regards to the database
      // whatever the user agent online status says. Otherwise, check with UA.
      if (err) {
        this.setState({onlineStatus: 'offline'})
      } else {
        this.updateOnlineStatus()
      }
    }).on('active', () => {
      this.setState({onlineStatus: 'syncing'})
    }).on('error', (err) => {
      console.log(err)
    })
  }

  stopRemotePush () {
    this.remotePush && this.remotePush.cancel()
  }

  startRemotePull () {
    // const {user} = this.state
    // let query = getUserOrganisationUnits(user, this.props.organisationUnits)
    // query.user = user.name

    console.log('starting remote pull for user')
    this.remotePull = this.caseDb.replicate.from(this.remoteCaseDb, {
      live: true,
      retry: true,
      // filter: 'docs/user_cases',
      // query_params: query
    }).on('complete', () => {
      console.log('Remote pull complete')
    }).on('paused', (err) => {
      if (err) console.log(err)
      this.updateOnlineStatus()
    }).on('active', () => {
      this.setState({onlineStatus: 'syncing'})
    }).on('error', (err) => {
      console.log(err)
    })
  }

  stopRemotePull () {
    this.remotePull && this.remotePull.cancel()
  }

}

function mapStateToProps (state) {
  return {
    updatedCase: state.caseData.updated,
    vehicleDetails: state.caseData.vehicleDetails,
    organisationUnits: state.organisationUnits,
    dataElements: state.dataElements,
    attributes: state.attributes,
    syncState: state.syncState,
    initialized: state.initialized
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(CaseActions, dispatch),
    dispatch // for general purpose use case
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
