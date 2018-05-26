'use strict'

import { SET_SYNC_STATE } from '../constants/ActionTypes'

const initialState = {
  text: 'unknown'
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SYNC_STATE:
      return { text: action.text }

    default:
      return state
  }
}
