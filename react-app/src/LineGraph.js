import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import numeral from 'numeral'

const SEARCH_DAYS = 120;
const HISTORICAL_DATA = 'https://disease.sh/v3/covid-19/historical'

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

function LineGraph({ countryCode, casesType = 'cases' }) {
  const [data, setData] = useState({})

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
      const dataTarget = countryCode === 'worldwide' ? '/all' : `/${countryCode}`
      const url = new URL(`${HISTORICAL_DATA}${dataTarget}`)
      url.searchParams.set('lastdays', SEARCH_DAYS)
      const res = await fetch(url)
      const historicalData = await res.json()
      const dataForBuildingChart = countryCode === 'worldwide' ? historicalData : historicalData.timeline
      const chartData = buildChartData(dataForBuildingChart);
      setData(chartData)
    }
    getHistoricalData()

  }, [countryCode, casesType])

  return (
    <div>
      {data.length > 0 && (
        <Line data={{
          datasets: [
            {
              data: data,
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
