'use strict'

import { combineReducers } from 'redux'
import appState from './appState'
import idsrCases from './idsrCases'
import syncState from './syncState'
import attributes from './attributes'
import dataElements from './dataElements'
import organisationUnits from './organisationUnits'
import initialized from './initialized'

export default combineReducers({
  appState,
  caseData: idsrCases,
  syncState,
  attributes,
  dataElements,
  organisationUnits,
  initialized
})
