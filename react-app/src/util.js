import React from 'react';
import numeral from "numeral";
import { Circle, Popup } from 'react-leaflet'

const casesTypeColors = {
  cases: {
    hex: "orange",
    multiplier: 300
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 250
  },
  deaths: {
    hex: "#CC1034",
    multiplier: 500
  },
}

export const sortData = (data) => {
  const sortedData = [...data];
  sortedData.sort((a, b) => b.cases - a.cases)
  return sortedData;
}

export const prettyPrintStat = (stat) => {
  return stat != null ? `+${numeral(stat).format("0.0a")}` : 0
}

// Draw circles on the map with interactive tooltip
export const showDataOnMap = (data, casesType = 'cases') => {

  return data.map((country, index) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        key={index}
      >
        <Popup>
          <div className="info-container">
            <div className="info-flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
            <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
          </div>
        </Popup>
      </Circle>
    )
  })
}

export const lineGraphOption = {
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