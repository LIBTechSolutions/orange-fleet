'use strict'

import {
  INSERT_DATA_ELEMENT, UPDATE_DATA_ELEMENT, DELETE_DATA_ELEMENT
} from '../constants/ActionTypes'

const initialState = []

export default function dataElements (state = initialState, action) {
  switch (action.type) {
    case INSERT_DATA_ELEMENT:
      return [
        action.item,
        ...state
      ]
    case UPDATE_DATA_ELEMENT:
      return state.map(item =>
        item._id === action.item.id
          ? action.item
          : item
      )
    case DELETE_DATA_ELEMENT:
      return state.filter(item => item.code !== action.code)
    default:
      return state
  }
}
