'use strict'

import * as types from '../constants/ActionTypes'

export function insertCase (idsrCase, localEdit = false) {
  return { type: types.INSERT_CASE, idsrCase, localEdit }
}

export function updateCase (idsrCase, localEdit = false) {
  return { type: types.UPDATE_CASE, idsrCase, localEdit }
}

export function deleteCase (idsrCase) {
  return { type: types.DELETE_CASE, id: idsrCase._id }
}
