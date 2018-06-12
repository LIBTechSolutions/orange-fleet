'use strict'

import * as types from '../constants/ActionTypes'

export function insertCase (vehicleDetail, localEdit = false) {
  return { type: types.INSERT_CASE, vehicleDetail, localEdit }
}

export function updateCase (vehicleDetail, localEdit = false) {
  return { type: types.UPDATE_CASE, vehicleDetail, localEdit }
}

export function deleteCase (vehicleDetail) {
  return { type: types.DELETE_CASE, id: vehicleDetail._id }
}
