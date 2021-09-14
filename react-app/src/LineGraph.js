import React, { useState, useEffect } from 'react'
import numeral from 'numeral'
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const SEARCH_DAYS = 120;
const HISTORICAL_DATA = 'https://disease.sh/v3/covid-19/historical';
const PATH_WORLDWIDE = '/all';

const options = {
  elements: {
    point: {
      radius: 0
    }
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem) {
          return numeral(tooltipItem.formattedValue).format("+0,0")
        }
      }
    }
  },
  scales: {
    x: {
      time: {
        format: "MM/DD/YY",
      }
    },
    y: {
      grid: {
        display: false
      },
      ticks: {
        // include a dollar sign in the ticks
        callback: function (value) {
          return numeral(value).format("0a")
        }
      }
    }
  }
}

function LineGraph({ casesType }) {
  const [chartData, setChartData] = useState([])

  const buildChartData = (data) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
      if (lastDataPoint != null) {
        const newDatapoint = {
          x: date,
          y: Math.abs(data[casesType][date] - lastDataPoint)
        }
        chartData.push(newDatapoint)
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData
  }

  useEffect(() => {
    const getHistoricalData = async () => {
      const url = new URL(`${HISTORICAL_DATA}${PATH_WORLDWIDE}`)
      url.searchParams.set('lastdays', SEARCH_DAYS)
      const res = await fetch(url)
      const historicalData = await res.json()
      const chartData = buildChartData(historicalData);
      setChartData(chartData)
    }
    getHistoricalData()
  }, [casesType])

  return (
    <div>
      {chartData.length > 0 && (
        <Line data={{
          datasets: [
            {
              data: chartData,
              backgroundColor: 'rgba(204, 16, 52, 0.3)',
              borderColor: '#CC1034',
              fill: true,
            }
          ]
        }}
          options={options}
        />
      )}
    </div>
  )
}

export default LineGraph
