import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import "./App.css";
import InfoBox from './InfoBox'
import Map from './Map'

const COVID_TOTAL_CASE_URL = 'https://disease.sh/v3/covid-19';
const PATH_WORLDWIDE = '/all';
const PATH_COUNTRIES = '/countries';
const COUNTRY_CODE_WORLDWIDE = 'worldwide';

function App() {

	// [{ name: "Afghanistan", value: "AF" }]
	const [countries, setCountries] = useState([]);
	// country code >> JP
	const [countryCode, setCountryCode] = useState(COUNTRY_CODE_WORLDWIDE);
	// country information
	const [countryInfo, setCountryInfo] = useState({})

	// get countyInfo in array and set it as default 
	useEffect(() => {
		const getCountriesData = async () => {
			const res = await fetch(COVID_TOTAL_CASE_URL + PATH_COUNTRIES);
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

	// initialize countryInfo with data of all country
	useEffect(() => {
		const getInitialCountryInfo = async () => {
			const res = await fetch(`${COVID_TOTAL_CASE_URL + PATH_WORLDWIDE}`);
			const data = await res.json();
			setCountryInfo(data);
		}
		getInitialCountryInfo();
	}, [])

	// emit every time button gets clicked
	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		const url = countryCode === COUNTRY_CODE_WORLDWIDE
			? `${COVID_TOTAL_CASE_URL + PATH_WORLDWIDE}`
			: `${COVID_TOTAL_CASE_URL + PATH_COUNTRIES}/${countryCode}`
		const res = await fetch(url)
		const data = await res.json()
		// update countryCode
		setCountryCode(countryCode)
		// all of the data from the country
		setCountryInfo(data)
	}

	console.log("currently selected" + countryInfo);

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select variant="outlined" onChange={onCountryChange} value={countryCode}>
							<MenuItem value={COUNTRY_CODE_WORLDWIDE}>Worldwide</MenuItem>
							{countries.map((country, index) => {
								return (
									<MenuItem key={index} value={country.value}>{country.name}</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>

				<div className="app__stats">
					<InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
					<InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.cases} />
					<InfoBox title="Death" cases={countryInfo.todayDeaths} total={countryInfo.cases} />
				</div>

				{/* Map */}
				<Map />
			</div>

			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					{/* Graph */}
					<h3>Worldwide new cases</h3>
				</CardContent>
				{/* Table */}
			</Card>
		</div>
	);
}

export default App;
