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
import * as VehicleActions from '../actions/vehicles'
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

    this.vehicleDb = null
    this.remoteVehicleDb = null

    this.remotePush = null
    this.remotePull = null

    this.state = {
      waitingUser: null,
      user: null,
      vehicleDb: null,
      remoteVehicleDb: null,
      loginErrorVisible: false,
      busy: true
    }

    this.checkLogin = this.checkLogin.bind(this)
    this.logout = this.logout.bind(this)
  }

  checkLogin (username, password) {
    this.setState({ busy: true })
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
      this.vehicleDb = new PouchDB(config.db.vehicle.local)
      /*
        Disable crypto-pouch for this to be resolved https://github.com/pouchdb-community/transform-pouch/issues/8
        this.caseDb.crypto(sharedSecretKey)
      */
      this.remoteVehicleDb = new PouchDB(config.db.vehicle.remote, {auth})

      // Inform pouch-redux that the database is ready
      this.props.dispatch(dynamicPouchReduxSetDb('vehicleDb', this.vehicleDb))
      this.login(waitingUser)
    })
    .catch((error) => {
      console.error('Error while trying to login', error)
      this.loginFail()
    })
  }


  login (waitingUser) {
    this.setState({waitingUser, loginErrorVisible: false})
  }

  logout () {
    this.start({busy: false, user: null, waitingUser: null})
    this.props.dispatch({type: 'LOGOUT'})
  }

  loginFail () {
    this.setState({busy: false, loginErrorVisible: true})
  }

  isLoggedIn () {
    return !!this.state.user
  }

  componentWillReceiveProps (nextProps) {
    // Move to dashboard screen only when everything is ready
    if (!this.state.user) {
      this.setState({busy: false, user: this.state.waitingUser, loginErrorVisible: false})
    }
  }
  
  componentDidUpdate (prevProps, prevState) {
    if (prevState.user && this.state.user === null) {
      // User logged out (stop casedb sync)
      this.stopRemotePush()
      this.stopRemotePull()
      // this.stopEpiSync()
      Promise.all([this.vehicleDb.close(), this.remoteVehicleDb.close()]).then(() => {
        this.vehicleDb = null
        this.remoteVehicleDb = null
      })
    } else if (prevState.user !== this.state.user) {
      // New user logged in (start casedb sync)
      this.startRemotePush()
      this.startRemotePull()
    }
  }


  // componentDidMount () {
  //   this.startRemotePush()
  //   this.startRemotePull()
    
  // }

  // componentWillUnmount () {
  //   this.stopRemotePush()
  //   this.stopRemotePull()
  // }

  render () {
    return <App {...this.state} {...this.props}
      checkLogin={this.checkLogin}
      loggedIn={this.isLoggedIn()}
      logout={this.logout}
    />
  }

  startRemotePush () {
    // replicate db
    console.log('starting remote push')
    this.remotePush = this.vehicleDb.replicate.to(this.remoteVehicleDb, {
      live: true,
      retry: true
    }).on('complete', () => {
      console.log('Remote push complete')
    }).on('error', (err) => {
      console.log(err)
    })
  }

  stopRemotePush () {
    this.remotePush && this.remotePush.cancel()
  }

  startRemotePull () {
    let {user} = this.state

    console.log('starting remote pull for user', user)
    this.remotePull = this.vehicleDb.replicate.from(this.remoteVehicleDb, {
      live: true,
      retry: true,
    //   filter: filterCases(user) // FIXME: Use a design doc with query
    }).on('complete', () => {
      console.log('Remote pull complete')
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
    vehicleDetails: state.vehicleDetails,
    initialized: state.initialized
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(VehicleActions, dispatch),
    dispatch // for general purpose use case
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)
