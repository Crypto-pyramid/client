import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import { Follower } from '../repositories/StatisticsRepository'
import { Pagination } from '../utils/Pagination'
import InfiniteScroll from 'react-infinite-scroll-component'

interface P {
  pagination: Pagination<Follower>
  fetchData: (last: Pagination<Follower>) => Promise<void>
}

function MembersTable({ pagination, fetchData }: P) {
  const classes = useStyles()

  return (
    <>
      {pagination.total === 0 ? (
        <div className={classes.empty}>No users with followers found!</div>
      ) : (
        <InfiniteScroll
          dataLength={pagination.data.length}
          next={() => fetchData(pagination)}
          hasMore={!pagination.noMore}
          loader={<></>}
          scrollThreshold={'200px'}
          scrollableTarget='flows'
        >
          <div className={classNames(classes.content, 'list')}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th />
                  {/*<th>Name</th>*/}
                  <th className={classes.left}>Wallet</th>
                  <th className={classes.right}>Followers</th>
                </tr>
              </thead>

              <tbody>
                {pagination.data.map((follower, index) => (
                  <tr key={index}>
                    <td className={classes.index}>{index + 1}</td>
                    {/*<td>{follower.user.portrait} {follower.user.name} </td>*/}
                    <td className={classes.singleLineText}>
                      {/*<Link to={`/user/${follower.user.address}`}>*/}
                      {follower.user.address}
                      {/*</Link>*/}
                    </td>
                    <td className={classes.right}>{follower.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      )}
    </>
  )
}

export default MembersTable

const useStyles = createUseStyles(
  () => ({
    content: {
      height: '300px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '&.list': {
        overflowY: 'auto',
      },
    },

    empty: {
      padding: '20px 10px',
      borderRadius: '10px',
      boxSizing: 'border-box',
      lineHeight: '20px',
      fontSize: '18px',
      color: 'white',
      textAlign: 'center',
      background: '#27282926',
    },

    table: {
      width: '100%',
      fontSize: '18px',
      borderSpacing: '0em',
      borderRadius: '10px',
      borderCollapse: 'collapse',
      overflow: 'hidden',
      '&>thead': {
        position: 'sticky',
        top: '0',
        zIndex: '1',
        background: '#27282926',
        borderBottom: '1px solid white',
        '&>tr': {
          '&>th': {
            borderBottom: '2px solid #ffffff8c',
            paddingBottom: '5px',
            paddingTop: '5px',
            '&:last-child': {
              paddingRight: '10px',
            },
          },
        },
      },

      '&>tbody': {
        overflowY: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '&>tr': {
          background: '#27282926',
          '&>td': {
            paddingTop: '15px',
            paddingBottom: '15px',
            '&:last-child': {
              paddingRight: '10px',
            },
            '&:first-child': {
              padding: '0px 15px',
            },
          },
        },
        '&>tr:hover': {
          background: '#16171830',
          borderColor: '#16171830',
        },
      },
    },

    singleLineText: {
      textAlign: 'left',
      '@media only screen and (max-width: 600px)': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '300px',
        margin: 'auto',
      },
    },

    topOwners: {
      fontSize: '15px',
      color: 'white',
      marginBottom: '15px',
    },

    index: {
      paddingLeft: '10px',
      width: '0%',
      color: 'white',
    },

    right: {
      textAlign: 'right',
    },

    left: {
      textAlign: 'left',
    },
  }),
  {}
)
