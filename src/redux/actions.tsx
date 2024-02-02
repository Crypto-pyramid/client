import { Member } from '../models/Member'
import { SecurityRepository } from '../repositories/SecurityRepository'

export interface LoginAction {
  type: 'LOGIN'
  member?: Member
}

export function login(member?: Member) {
  return {
    type: 'LOGIN',
    member,
  }
}

export async function logout() {
  try {
    await SecurityRepository.$.logout()
  } catch (_) {}

  return {
    type: 'LOGIN',
    member: Member.ANONYMOUS,
  }
}

export type Action = LoginAction
