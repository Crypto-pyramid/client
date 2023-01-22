import { useCallback, useContext, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Follower, StatisticsRepository, UsersByDay } from '../repositories/StatisticsRepository';
import UsersGraph from '../widgets/UsersGraph';
import MembersTable from '../widgets/MembersTable';
import { Pagination } from '../utils/Pagination';
import { numberFormat } from '../models';
import { Adsense } from '@ctrl/react-adsense';
import useWindowDimensions from '../widgets/useWindowDimensions';


function Statistics() {
  
  const classes = useStyles();

  const repo = useContext(StatisticsRepository.context);

  const { width } = useWindowDimensions();

  const [usersCount, setUsersCount] = useState<number | undefined>(undefined);
  const [usersInPyramidCount, setUsersInPyramidCount] = useState<number | undefined>(undefined);
  const [usersCountToday, setUsersCountToday] = useState<number | undefined>(undefined);
  const [usersByDay, setUsersByDay] = useState<UsersByDay[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const [pagination, setPagination] = useState<Pagination<Follower>>(
    Pagination.empty(),
  );

  useEffect(() => {
    if(!firstLoad)
      return

    repo
      .getUsersCount()
      .then(setUsersCount)
      .catch(() => setUsersCount(undefined));

    repo
      .getUsersInPyramidCount()
      .then(setUsersInPyramidCount)
      .catch(() => setUsersInPyramidCount(undefined));

    repo
      .getUsersCountToday()
      .then(setUsersCountToday)
      .catch(() => setUsersCountToday(undefined));

    repo
      .getUsersByDay()
      .then(setUsersByDay)
      .catch(() => setUsersByDay([]));

    setFirstLoad(false)
  }, []);

  const fetchData = useCallback(
    async (last: Pagination<Follower>) => {

      repo
        .getFollowers(last.page + 1, 10)
        .then(p => setPagination(last.merge(p)));
    },
    [repo],
  );

  useEffect(() => {
    const last = Pagination.empty<Follower>();
    setPagination(last);
    fetchData(last);
  }, [fetchData]);

  return (
    <>
     {width > 1550 &&
      <>
        <div className={classes.adsDeskop} style={{ marginLeft: '50px'}}>
          <Adsense
            client="ca-pub-9350149521504088"
            slot="9168418162"
            style={{ display: 'block' }}
            data-full-width-responsive="true"
            layout="in-article"
          />
        </div>

        <div className={classes.adsDeskop} style={{ marginRight: '50px', right: 0}}>
          <Adsense
            client="ca-pub-9350149521504088"
            slot="1973288576"
            style={{ display: 'block' }}
            data-full-width-responsive="true"
            layout="in-article"
          />
        </div>
      </>
      }
      <div className={classes.c}>
      {width < 1550 &&
        <div className={classes.adsDeskopHorizontal}>
          <Adsense
            client="ca-pub-9350149521504088"
            slot="8702348450"
            style={{ display: 'block' }}
            data-full-width-responsive="true"
            layout="in-article"
          />
        </div>
      }
      <h1>Statistics</h1>
      <div className={classes.cc}>
          <div className={classes.flex}>
            <div className={classes.item}>
              <div className={classes.title}>
                All members
              </div>
              <div className={classes.box}>
                {!usersCount ? '--' : numberFormat(usersCount)}
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.title}>
                Today's members
              </div>
              <div className={classes.box}>
                {!usersCountToday ? '--' : numberFormat(usersCountToday)}
              </div>
            </div>
            <div className={classes.item}>
              <div className={classes.title}>
                All members in the pyramid
              </div>
              <div className={classes.box}>
                {!usersInPyramidCount ? '--' : numberFormat(usersInPyramidCount)}
              </div>
            </div>
          </div>
          <div className={classes.graph}>
            <div className={classes.title}>
              Number of new users per day
            </div>
            <UsersGraph chart={usersByDay}/>
          </div>
          <div className={classes.table}>
            <div className={classes.title}>
              Users rankings
            </div>
            <MembersTable pagination={pagination} fetchData={fetchData}/>
          </div>
          {width < 1550 &&
            <div className={classes.adsDeskopHorizontal}>
              <Adsense
                client="ca-pub-9350149521504088"
                slot="8865999985"
                style={{ display: 'block' }}
                data-full-width-responsive="true"
                layout="in-article"
              />
            </div>
          }
      </div>
      </div>
    </>
    
  );
}

export default Statistics;

const useStyles = createUseStyles(
  () => ({
    c: {
      minHeight: `calc(100vh - 103px)`,
      color: 'white',
      maxWidth: '1024px',
      textAlign: 'center',
      margin:'auto'
    },

    cc:{
      padding: '0 25px',
      marginTop: '40px',
      marginBottom: '100px'
    },

    title:{
      fontWeight:'800',
      textAlign:'initial',
      marginBottom: '10px'
    },

    flex: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between'
    },

    item: {
      width: '300px',
      height: '100px',
      margin: 'auto'
    },

    box:{
      borderRadius: '10px',
      background: '#27282926',
      height:'55px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      fontWeight: '800'
    },

    graph:{
      marginTop: '50px',
      height: '300px'
    },

    table: {
      marginTop: '50px',
      maxHeight: '400px'
    },

    adsDeskop:{
      position: 'fixed',
      height:'100%',
      width: '200px',
      zIndex: '10'
    },

    adsDeskopHorizontal:{
      textAlign: 'center',
      height: '100px'
    }
  }),
);
