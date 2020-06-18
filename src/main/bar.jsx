import React from 'react'
import { Chart } from 'react-charts'

export default function Bar({chartData}) { 
  const axes = React.useMemo(() => [
    { primary: true, type: 'ordinal', position: 'bottom' },
    { type: 'linear', position: 'left', stacked: true }
  ], []);
  const series = React.useMemo(() => ({type: 'bar'}), []);
 
  const COLORS = ['#98C1D9','#721817'];
  const getSeriesStyle = React.useCallback(
    series => ({
      color: `${COLORS[series.index]}`,
      opacity: 1,
    })
  );
  return (
    <div className="w-full" style={{height: '20rem'}}>
      {chartData ? (
        <Chart data={chartData} series={series} axes={axes} tooltip getSeriesStyle={getSeriesStyle}/>
      ) : (
          <p className="text-center w-full">Waiting for data&#8230;</p>
        )
      }
    </div>
  );
}