import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";
import InfoBox from './InfoBox'
import Map from './Map'

function App() {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("Worldwide");

	useEffect(() => {
		const getCountriesData = async () => {
			const res = await fetch("https://disease.sh/v3/covid-19/countries");
			const data = await res.json();

			const countries = data.map((country) => {
				return {
					name: country.country,
					value: country.countryInfo.iso2,
				};
			});

			setCountries(countries);
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		setCountry(countryCode);
	}

	// STATE = How to write a variable in REACT
	return (
		<div className="app">
			<div className="app__header">
				<h1>COVID-19 TRACKER</h1>
				<FormControl className="app__dropdown">
					<Select variant="outlined" onChange={onCountryChange} value={country}>
						<MenuItem value="Worldwide">Worldwide</MenuItem>
						{countries.map((country, index) => {
							return (
								<MenuItem key={index} value={country.value}>{country.name}</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</div>

			<div className="app__stats">
				<InfoBox title="Coronavirus Cases" cases="+2,500" total="1.2 M Total" />
				<InfoBox title="Recovered" cases="+2,500" total="1.2 M Total" />
				<InfoBox title="Death" cases="+2,500" total="1.2 M Total" />
			</div>


			{/* Table */}
			{/* Graph */}

			{/* Map */}
			<Map />
		</div>
	);
}

export default App;
