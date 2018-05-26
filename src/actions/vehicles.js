'use strict'

import * as types from '../constants/ActionTypes'

export const insertVehicle = (vehicleDetail) => {
  return { type: types.INSERT_VEHICLE, vehicleDetail }
}

export const updateVehicle = (vehicleDetail) => {
  return { type: types.UPDATE_VEHICLE, vehicleDetail }
}

export const deleteVehicle = (vehicleDetail) => {
  return { type: types.DELETE_VEHICLE, id: vehicleDetail._id }
}

