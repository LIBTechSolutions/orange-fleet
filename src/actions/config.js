'use strict'

import * as types from '../constants/ActionTypes'

export const organisationUnits = {
  insert: item => ({ type: types.INSERT_ORG_UNIT, item }),
  update: item => ({ type: types.UPDATE_ORG_UNIT, item }),
  remove: item => ({ type: types.DELETE_ORG_UNIT, id: item._id })
}

export const dataElements = {
  insert: item => ({ type: types.INSERT_DATA_ELEMENT, item }),
  update: item => ({ type: types.UPDATE_DATA_ELEMENT, item }),
  remove: item => ({ type: types.DELETE_DATA_ELEMENT, code: item.code })
}

export const attributes = {
  insert: item => ({ type: types.INSERT_ATTRIBUTE, item }),
  update: item => ({ type: types.UPDATE_ATTRIBUTE, item }),
  remove: item => ({ type: types.DELETE_ATTRIBUTE, code: item.code })
}
