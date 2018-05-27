import React from 'react'
import { Provider } from 'react-redux'
import PouchDB from 'pouchdb-browser'
// import App from './App'
// import indexRoutes from 'routes/index';
import AppContainer from 'appcontainer/app'
import configureStore from './store/configureStore'
import config from './config.json'

const userDb = new PouchDB(config.db.users.local)
const configDb = new PouchDB(config.db.config.local)
const {auth} = config.db
const remoteConfigDb = new PouchDB(config.db.config.remote, {auth})

const store = configureStore(configDb)


export default function App (props) {
    return (
        <Provider store={store}>
        <AppContainer
        config={config}
        configDb={configDb}
        userDb={userDb}
        remoteConfigDb={remoteConfigDb}
        {...props}
        />
        </Provider>
    )
}

  

