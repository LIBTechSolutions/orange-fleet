'use strict'

import {
  INSERT_ORG_UNIT, UPDATE_ORG_UNIT, DELETE_ORG_UNIT
} from '../constants/ActionTypes'

const initialState = []

export default function organisationUnits (state = initialState, action) {
  switch (action.type) {
    case INSERT_ORG_UNIT:
      return [
        action.item,
        ...state
      ]
    case UPDATE_ORG_UNIT:
      return state.map(item =>
        item._id === action.item._id
          ? action.item
          : item
        )
    case DELETE_ORG_UNIT:
      return state.filter(item => item._id !== action.id)
    default:
      return state
  }
}
