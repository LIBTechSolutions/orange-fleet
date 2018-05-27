'use strict'

import {
  APP_SHOW_DIALOG,
  APP_HIDE_DILAOG,
  APP_HAS_UNSAVED_DATA
} from '../constants/ActionTypes'

const initialState = {
  hasUnsavedData: false,
  dialogState: {
    show: false,
    dialogInfo: null
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_SHOW_DIALOG:
      return Object.assign({}, state, {
        dialogState: {
          show: true,
          dialogInfo: action.dialogInfo
        }
      })
    case APP_HIDE_DILAOG:
      return Object.assign({}, state, {
        dialogState: {
          show: false,
          dialogInfo: null
        }
      })
    case APP_HAS_UNSAVED_DATA:
      return Object.assign({}, state, {hasUnsavedData: action.hasUnsavedData})
    default:
      return state
  }
}
