import React from 'react'
import { Chart } from 'react-charts'
 
export default function Graph({chartData}) {
  const axes = React.useMemo(() => [
    { primary: true, type: 'linear', position: 'bottom', label: 'Days since Bag End' },
    { type: 'linear', position: 'left', label: 'Miles Travelled'}
  ], []);
  
  const COLORS = ['#721817','#98C1D9'];
  const getSeriesStyle = React.useCallback(
    series => ({
      color: `${COLORS[series.index]}`,
      opacity: 1,
    })
  );
  return (
    <div className="w-full" style={{height: '20rem'}}>
      {chartData ? (
        <Chart data={chartData} axes={axes} tooltip getSeriesStyle={getSeriesStyle}/>
      ) : (
        <p className="text-center w-full">Waiting for data&#8230;</p>
      )}
    </div>
  )
}