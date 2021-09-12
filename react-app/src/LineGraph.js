import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import numeral from 'numeral'

const SEARCH_DAYS = 120;
const WORLDWIDE_HISTORICAL_DATA_URL = `https://disease.sh/v3/covid-19/historical/all`
const worldwideHistoricalDataUrl = new URL(WORLDWIDE_HISTORICAL_DATA_URL)
worldwideHistoricalDataUrl.searchParams.set('lastdays', SEARCH_DAYS)

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

function LineGraph() {
  const [data, setData] = useState({})

  const buildChartData = (data, casesType = 'cases') => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint != null) {
        const newDatapoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint
        }
        chartData.push(newDatapoint)
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData
  }

  useEffect(() => {

    const getHistoricalData = async () => {
      const res = await fetch(worldwideHistoricalDataUrl)
      const historicalData = await res.json()
      const chartData = buildChartData(historicalData);
      setData(chartData)
    }
    getHistoricalData()

  }, [])

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
