import { useState } from 'react';
import { createUseStyles } from 'react-jss';

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoricalChartState } from 'recharts/types/chart/generateCategoricalChart';
import { humanNumber } from '../models';
import { UsersByDay } from '../repositories/StatisticsRepository';

interface P {
  chart: UsersByDay[];
}

function UsersGraph({ chart }: P) {
  const classes = useStyles();

  const [focusBar, setFocusBar] = useState<number>();
  const handleMouseMove = (state: CategoricalChartState) =>
    setFocusBar(state.isTooltipActive ? state.activeTooltipIndex : undefined);

  if (!chart) {
    return <div className={classes.empty}>No activity yet</div>;
  }

  return (
    <>
      {chart.length === 0 ? (
          <div className={classes.empty}>No users found in pyramid!</div>
      ) : (
        <div className={classes.box}>
          <ResponsiveContainer width="99%">
            <BarChart
              data={chart}
              onMouseMove={handleMouseMove}
              margin={{ left: 10, right: 20, top: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="date"
                stroke={'white'}
              />
              <YAxis
                dataKey="count"
                stroke={'white'}
              />

              <Bar dataKey="count">
                {chart.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      focusBar === index
                        ? '#6b757e'
                        : 'grey'
                    }
                  />
                ))}
              </Bar>

              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!payload || payload.length === 0 || !payload[0].payload)
                    return;

                  const item = chart.find(
                    i => i.date === payload[0].payload.date,
                  );
                  if (active && item) {
                    return (
                      <div className={classes.tooltip}>
                        <div className={classes.date}>
                          <div>{item.date}</div>
                        </div>
                        <div className={classes.count}>
                          <div>{humanNumber(item.count)}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
}

export default UsersGraph;

const useStyles = createUseStyles(
  () => ({
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

    box: {
      borderRadius: '10px',
      background: '#27282926',
      height: '280px',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    tooltip: {
      background: '#1a1b1bb3',
      borderRadius: '8px',
      padding: '15px',
      fontWeight: '800',
      fontSize: '18px',
      lineHeight: '20px',
    },

    date:{
      fontSize: '14px',
      color: 'gray',
      borderBottomColor: '#ffffff8c',
      borderBottom: '2px',
      borderBottomStyle: 'solid'
    },

    count:{
      marginTop:'10px'
    }

  }),
  { },
);
