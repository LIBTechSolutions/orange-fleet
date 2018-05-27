'use strict'

import {
  INSERT_ATTRIBUTE, UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE
} from '../constants/ActionTypes'

const initialState = []

export default function attributes (state = initialState, action) {
  switch (action.type) {
    case INSERT_ATTRIBUTE:
      return [
        action.item,
        ...state
      ]
    case UPDATE_ATTRIBUTE:
      return state.map(item =>
        item._id === action.item._id
          ? action.item
          : item
      )
    case DELETE_ATTRIBUTE:
      return state.filter(item => item.code !== action.code)
    default:
      return state
  }
}
