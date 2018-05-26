import React from 'react'
import { Provider } from 'react-redux'
import PouchDB from 'pouchdb-browser'
// import App from './App'
// import indexRoutes from 'routes/index';
import AppContainer from 'appcontainer/app'
import configureStore from './store/configureStore'
import config from './config.json'

const vehicleDb = new PouchDB(config.db.vehicle.local)
const userDb = new PouchDB(config.db.users.local)
const {auth} = config.db

let loadedData = {}
const initialBatchTracker = (name) => () => { loadedData[name] = true }
const store = configureStore(vehicleDb, initialBatchTracker)


export default function App (props) {
    return (
        <Provider store={store}>
        <AppContainer
        config={config}
        userDb={userDb}
        {...props}
        />
        </Provider>
    )
}

  

