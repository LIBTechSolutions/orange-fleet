'use strict'

import * as types from '../constants/ActionTypes'

export const showDialog = (messageTitle, confirmText, confirmDesc, cancelText, cancelDesc, confirmCallback) => {
  return {
    type: types.APP_SHOW_DIALOG,
    dialogInfo: {
      messageTitle,
      confirmText,
      confirmDesc,
      cancelText,
      cancelDesc,
      confirmCallback
    }
  }
}

export const hideDialog = () => {
  return { type: types.APP_HIDE_DILAOG }
}

export const setAppUnsavedDataStatus = (status) => {
  return { type: types.APP_HAS_UNSAVED_DATA, hasUnsavedData: status }
}
