'use strict'

import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import { insertVehicle, updateVehicle, deleteVehicle } from '../actions/vehicles'

export default function configureStore (vehicleDb, initialBatchTracker) {
  const pouchMiddleware = PouchMiddleware([{
    path: '/vehicleDetails',
    db: vehicleDb,
    actions: {
      insert: insertVehicle,
      update: updateVehicle,
      remove: deleteVehicle
    },
    initialBatchDispatched: initialBatchTracker('vehicleDetails')
  }])

  const store = createStore(
    reducer,
    undefined,
    applyMiddleware(pouchMiddleware)
  )

  return store
}
