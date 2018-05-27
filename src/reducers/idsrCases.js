'use strict'

import { INSERT_CASE, UPDATE_CASE, DELETE_CASE, RESET_CASES } from '../constants/ActionTypes'

const initialState = {
  updated: null,
  idsrCases: []
}

export default function idsrCases (state = initialState, action) {
  switch (action.type) {
    case INSERT_CASE:
      return {
        updated: action.localEdit ? null : action.idsrCase._id,
        idsrCases: [
          action.idsrCase,
          ...state.idsrCases
        ]
      }
    case UPDATE_CASE:
      return {
        updated: action.localEdit ? null : action.idsrCase._id,
        idsrCases: state.idsrCases.map(idsrCase =>
          idsrCase._id === action.idsrCase._id
            ? action.idsrCase
            : idsrCase
        )
      }
    case DELETE_CASE:
      return {
        updated: null,
        idsrCases: state.idsrCases.filter(idsrCase =>
          idsrCase._id !== action.id
        )
      }
    case RESET_CASES:
      return { updated: null, idsrCases: [] }
    default:
      return state
  }
}
