import axios, { AxiosInstance } from 'axios'
import { createContext } from 'react'

export interface FollowResponseSchema {
  readonly FollowingId: number
  readonly FollowerId: number
}

export class FollowResponse {
  static from(data: FollowResponseSchema) {
    return new FollowResponse(data.FollowingId, data.FollowerId)
  }

  constructor(
    readonly FollowingId: number,
    readonly FollowerId: number
  ) {}
}

interface FollowerSchema {
  readonly followers: number
  readonly id: number
  readonly wallets: number
  readonly address?: string
}

export class Follower {
  static from(data: FollowerSchema) {
    return new Follower(
      data.followers,
      data.id,
      data.wallets,
      data.address ? data.address : undefined
    )
  }

  constructor(
    readonly followers: number,
    readonly id: number,
    readonly wallets: number,
    readonly address?: string
  ) {}
}

export class FollowRepository {
  static readonly context = createContext(new FollowRepository(axios))

  constructor(private a: AxiosInstance) {}

  async get(id: number): Promise<Follower> {
    const { data } = await this.a.get<Follower>(`/user?id=${id}`)

    return Follower.from(data)
  }

  async follow(id: number): Promise<number> {
    const { data } = await this.a.post<number>(`/follow?id=${id}`)

    return data
  }
}
