import moment, { Moment } from 'moment';

export class Pagination<T> {
  static empty<T>() {
    return new Pagination<T>(0, 0, []);
  }

  constructor(
    public readonly page: number,
    public readonly total: number,
    public readonly data: T[],
    public readonly refreshAt?: Moment,
  ) {}

  get noMore(): boolean {
    return this.data.length >= this.total;
  }

  merge(paging: Pagination<T>): Pagination<T> {
    if (this.page + 1 === paging.page) {
      return new Pagination(
        paging.page,
        paging.total,
        this.data.concat(paging.data),
        this.refreshAt || moment(),
      );
    } else {
      return this;
    }
  }

  from(time: Moment = moment()) {
    if (!this.refreshAt) {
      return undefined;
    }

    const s = Math.floor(time.diff(this.refreshAt) / 1000);
    if (s < 60) {
      return `${Math.max(0, s)}s ago`;
    }
    return `${Math.floor(s / 60)}m ago`;
  }
}

export interface PaginationJSON<T> {
  total: number;
  data: T[];
}
