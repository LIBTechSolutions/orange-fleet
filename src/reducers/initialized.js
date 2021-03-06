'use strict'

import { DATA_INITIALIZED, RESET_CASES } from '../constants/ActionTypes'

const initialState = {
  idsrCases: false,
  organisationUnits: false,
  dataElements: false,
  attributes: false,
  configuration: false,
  everything: false
}

export default function initialized (state = initialState, action) {
  switch (action.type) {
    case DATA_INITIALIZED:
      let newState = Object.assign({}, state, {
        [action.part]: true
      })
      if (newState.organisationUnits &&
          newState.dataElements &&
          newState.attributes) {
        newState.configuration = true
        if (newState.idsrCases) {
          newState.everything = true
        }
      }
      return newState
    case RESET_CASES:
      return Object.assign({}, state, { idsrCases: false, everything: false })
    default:
      return state
  }
}
