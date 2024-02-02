import { Member } from '../models/Member'

import { Action } from './actions'

export interface State {
  member?: Member
}

export default function rootReducer(state: State = {}, action: Action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, member: action.member }

    default:
      return state
  }
}
