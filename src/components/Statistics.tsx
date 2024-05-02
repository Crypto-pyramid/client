import { useCallback, useContext, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import {
  Follower,
  StatisticsRepository,
  UsersByDay,
} from '../repositories/StatisticsRepository'
import UsersGraph from '../widgets/UsersGraph'
import MembersTable from '../widgets/MembersTable'
import { Pagination } from '../utils/Pagination'
import { numberFormat } from '../models'
import animationData from '../assets/Animation.json'
import Lottie from 'lottie-react'
import { Helmet } from 'react-helmet'

function Statistics() {
  const classes = useStyles()

  const repo = useContext(StatisticsRepository.context)

  const [usersCount, setUsersCount] = useState<number | undefined>(undefined)
  const [usersInPyramidCount, setUsersInPyramidCount] = useState<
    number | undefined
  >(undefined)
  const [usersCountToday, setUsersCountToday] = useState<number | undefined>(
    undefined
  )
  const [usersByDay, setUsersByDay] = useState<UsersByDay[]>([])
  const [firstLoad, setFirstLoad] = useState(true)

  const [pagination, setPagination] = useState<Pagination<Follower>>(
    Pagination.empty()
  )

  useEffect(() => {
    if (!firstLoad) return

    repo
      .getUsersCount()
      .then(setUsersCount)
      .catch(() => setUsersCount(undefined))

    repo
      .getUsersInPyramidCount()
      .then(setUsersInPyramidCount)
      .catch(() => setUsersInPyramidCount(undefined))

    repo
      .getUsersCountToday()
      .then(setUsersCountToday)
      .catch(() => setUsersCountToday(undefined))

    repo
      .getUsersByDay()
      .then(setUsersByDay)
      .catch(() => setUsersByDay([]))

    setFirstLoad(false)
    // eslint-disable-next-line
  }, [])

  const fetchData = useCallback(
    async (last: Pagination<Follower>) => {
      repo
        .getFollowers(last.page + 1, 10)
        .then((p) => setPagination(last.merge(p)))
    },
    [repo]
  )

  useEffect(() => {
    const last = Pagination.empty<Follower>()
    setPagination(last)
    fetchData(last)
  }, [fetchData])

  return (
    <div className={classes.c}>
      <Helmet>
        <link rel='canonical' href='https://crypto-pyramid.com/stats' />
      </Helmet>
      <h1>Statistics</h1>

      {usersCount === undefined ||
      usersInPyramidCount === undefined ||
      usersCountToday === undefined ? (
        <div className={classes.animation}>
          <Lottie animationData={animationData} loop autoplay />
        </div>
      ) : (
        <div className={classes.cc}>
          <div className={classes.flex}>
            <div className={classes.item}>
              <div className={classes.title}>All members</div>
              <div className={classes.box}>
                {!usersCount ? '--' : numberFormat(usersCount)}
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.title}>Today's members</div>
              <div className={classes.box}>
                {!usersCountToday ? '--' : numberFormat(usersCountToday)}
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.title}>All members in the pyramid</div>
              <div className={classes.box}>
                {!usersInPyramidCount
                  ? '--'
                  : numberFormat(usersInPyramidCount)}
              </div>
            </div>
          </div>
          <div className={classes.graph}>
            <div className={classes.title}>Number of new users per day</div>
            <UsersGraph chart={usersByDay} />
          </div>
          <div className={classes.table}>
            <div className={classes.title}>Users rankings</div>
            <MembersTable pagination={pagination} fetchData={fetchData} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Statistics

const useStyles = createUseStyles(() => ({
  c: {
    minHeight: `calc(100vh - 103px)`,
    color: 'white',
    maxWidth: '1024px',
    textAlign: 'center',
    margin: 'auto',
  },

  cc: {
    padding: '0 25px',
    marginTop: '40px',
    marginBottom: '100px',
  },

  title: {
    fontWeight: '800',
    textAlign: 'initial',
    marginBottom: '10px',
  },

  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  item: {
    width: '300px',
    height: '100px',
    margin: 'auto',
  },

  box: {
    borderRadius: '10px',
    background: '#27282926',
    height: '55px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: '800',
  },

  graph: {
    marginTop: '50px',
    height: '300px',
  },

  table: {
    marginTop: '50px',
    maxHeight: '400px',
  },

  animation: {
    width: '30vw',
    height: '30vh',
    margin: 'auto',
  },
}))
