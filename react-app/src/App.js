import React, { useState, useEffect, useRef } from "react";
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import './App.css';

function App() {
  const divRef = useRef(null);
  const [countries, setCountries] = useState([]);

  useEffect(()=>{
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => {
            return {
              name: country.country,
              value: country.countryInfo.iso2,
            }
          })
          console.log("countries")
          console.log(countries)
          setCountries(countries)
      }, [])
    }

    getCountriesData();
  }, [])
  // STATE = How to write a variable in REACT
  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select variant="outlined" value="">
          {countries.map((country, index)=>{
            return (
              <MenuItem key={index} ref={divRef} value={country.value} >{country.name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      </div>
      {/* {console.log(divRef)} */}
      
      {/* Header */}
      {/* Title + Select input dropdown field */}

      {/* InfoBoxes */}
      {/* InfoBoxes */}
      {/* InfoBoxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
