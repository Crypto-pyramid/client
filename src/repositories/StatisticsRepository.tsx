import axios, { AxiosInstance } from 'axios'
import { createContext } from 'react'
import { Member } from '../models/Member'
import { Pagination, PaginationJSON } from '../utils/Pagination'

export interface UsersByDaySchema {
  readonly date: string
  readonly count: number
}

export class UsersByDay {
  static from(data: UsersByDaySchema) {
    return new UsersByDay(data.date, data.count)
  }

  constructor(
    readonly date: string,
    readonly count: number
  ) {}
}

interface FollowerSchema {
  readonly user: Member
  readonly count: number
}

export class Follower {
  static from(data: FollowerSchema) {
    return new Follower(data.user, data.count)
  }

  constructor(
    readonly user: Member,
    readonly count: number
  ) {}
}

export class StatisticsRepository {
  static readonly context = createContext(new StatisticsRepository(axios))

  constructor(private a: AxiosInstance) {}

  async getUsersByDay(): Promise<UsersByDay[]> {
    const { data } = await this.a.get<UsersByDaySchema[]>(`/users-by-day`)

    return data.map(UsersByDay.from)
  }

  async getUsersCount(): Promise<number> {
    const { data } = await this.a.get<number>(`/users-count`)

    return data
  }

  async getUsersInPyramidCount(): Promise<number> {
    const { data } = await this.a.get<number>(`/users-in-pyramid-count`)

    return data
  }

  async getUsersCountToday(): Promise<number> {
    const { data } = await this.a.get<number>(`/users-count-today`)

    return data
  }

  async getFollowers(
    page: number,
    size: number = 10
  ): Promise<Pagination<Follower>> {
    const { data } = await this.a.get<PaginationJSON<FollowerSchema>>(
      `/followers`,
      { params: { page, size } }
    )

    return new Pagination<Follower>(
      page,
      data.total,
      data.data.map(Follower.from)
    )
  }
}
