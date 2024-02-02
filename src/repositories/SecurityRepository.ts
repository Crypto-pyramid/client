import axios, { AxiosInstance } from 'axios'
import * as React from 'react'
import { Member, MemberJSON } from '../models/Member'

export class SecurityRepository {
  public static readonly $ = new SecurityRepository(axios)
  public static readonly Context = React.createContext(SecurityRepository.$)

  constructor(private a: AxiosInstance) {}

  public async login(
    address: string,
    message?: string,
    sign?: string
  ): Promise<Member> {
    await this.a
      .post<string>('/login', { address, message, sign })
      .then((response) => {
        //get token from response
        const token = response.data

        //set JWT token to local
        localStorage.setItem('token', token)

        //set token to axios common header
        setAuthToken(token)
      })
    return await this.whoami()
  }

  public async auth(message: string, sign: string) {
    const { data } = await this.a.put('/auth', { message, sign })

    return Member.bless(data)
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('token')
    setAuthToken()
  }

  public async whoami(): Promise<Member> {
    const { data } = await this.a.get<MemberJSON>('/whoami')
    return Member.bless(data)
  }

  public async hasLink(): Promise<boolean> {
    const { data } = await this.a.get<boolean>('/has-link')
    return data
  }
}

export const setAuthToken = (token?: string) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']
}
