'use strict'

import { INSERT_CASE, UPDATE_CASE, DELETE_CASE, RESET_CASES } from '../constants/ActionTypes'

const initialState = {
  updated: null,
  vehicleDetails: []
}

export default function vehicleDetails (state = initialState, action) {
  switch (action.type) {
    case INSERT_CASE:
      return {
        updated: action.localEdit ? null : action.vehicleDetail._id,
        vehicleDetails: [
          action.vehicleDetail,
          ...state.vehicleDetails
        ]
      }
    case UPDATE_CASE:
      return {
        updated: action.localEdit ? null : action.vehicleDetail._id,
        vehicleDetails: state.vehicleDetails.map(vehicleDetail =>
          vehicleDetail._id === action.vehicleDetail._id
            ? action.vehicleDetail
            : vehicleDetail
        )
      }
    case DELETE_CASE:
      return {
        updated: null,
        vehicleDetails: state.vehicleDetails.filter(vehicleDetail =>
          vehicleDetail._id !== action.id
        )
      }
    case RESET_CASES:
      return { updated: null, vehicleDetails: [] }
    default:
      return state
  }
}
