'use strict'

import { INSERT_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE } from '../constants/ActionTypes'

const initialState = []

export default function vehicleDetails (state = initialState, action) {
  switch (action.type) {
    case INSERT_VEHICLE:
      return [
        action.vehicleDetail,
        ...state
      ]
    case UPDATE_VEHICLE:
      return state.map(vehicleDetail =>
        vehicleDetail._id === action.vehicleDetail._id
          ? action.vehicleDetail
          : vehicleDetail
      )
    case DELETE_VEHICLE:
      return state.filter(vehicleDetail =>
        vehicleDetail._id !== action.id
      )
    default:
      return state
  }
}
