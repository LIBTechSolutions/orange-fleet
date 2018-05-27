'use strict'

import { createStore, applyMiddleware } from 'redux'

import reducer from '../reducers'
import { insertCase, updateCase, deleteCase } from '../actions/cases'
import * as configActions from '../actions/config'
import {DATA_INITIALIZED} from '../constants/ActionTypes'
import createDynamicPouchReduxMiddleware from './dynamicPouchReduxMiddleware'

export default function configureStore (configDb) {
  const dataLoaded = part => () => {
    store.dispatch({type: DATA_INITIALIZED, part})
  }

  const dynamicPouchMiddleware = createDynamicPouchReduxMiddleware([{
    path: '/caseData/idsrCases',
    db: null,
    name: 'caseDb',
    actions: {
      insert: insertCase,
      update: updateCase,
      remove: deleteCase
    },
    initialBatchDispatched: dataLoaded('idsrCases')
  }, {
    path: '/organisationUnits',
    db: configDb,
    changeFilter: doc => doc.doc_type === 'org-units',
    actions: configActions.organisationUnits,
    initialBatchDispatched: dataLoaded('organisationUnits')
  }, {
    path: '/dataElements',
    db: configDb,
    changeFilter: doc => doc.doc_type === 'data-elements',
    actions: configActions.dataElements,
    initialBatchDispatched: dataLoaded('dataElements')
  }, {
    path: '/attributes',
    db: configDb,
    changeFilter: doc => doc.doc_type === 'tracked-entity-attributes',
    actions: configActions.attributes,
    initialBatchDispatched: dataLoaded('attributes')
  }])

  const store = createStore(
    reducer,
    undefined,
    applyMiddleware(dynamicPouchMiddleware)
  )

  return store
}
