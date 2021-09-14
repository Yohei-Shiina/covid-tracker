import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import "./App.css";
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import LineGraph from './LineGraph'
import { sortData } from './util'

const COVID_TOTAL_CASE_URL = 'https://disease.sh/v3/covid-19';
const PATH_WORLDWIDE = '/all';
const PATH_COUNTRIES = '/countries';
const COUNTRY_CODE_WORLDWIDE = 'worldwide';
const DEFAULT_LAT_LONG = [36, 138]
const DEFAULT_ZOOM_LEVEL = 3;

function App() {
	const [countries, setCountries] = useState([]); // [{ name: "Afghanistan", value: "AF" }]
	const [countryCode, setCountryCode] = useState(COUNTRY_CODE_WORLDWIDE); // country code >> JP
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])
	const [mapCenter, setMapCenter] = useState(DEFAULT_LAT_LONG);
	const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM_LEVEL);
	const [mapCountries, setMapCountries] = useState([]);
	const [casesType, setCasesType] = useState("cases");

	const recenterMapPosition = (centerPosition, zoom = 3) => {
		setMapCenter(centerPosition);
		setMapZoom(zoom);
	}

	// set worldwide data
	useEffect(() => {
		const getInitialCountryInfo = async () => {
			const res = await fetch(`${COVID_TOTAL_CASE_URL + PATH_WORLDWIDE}`);
			const data = await res.json();
			setCountryInfo(data);
		}
		getInitialCountryInfo();
	}, [])

	useEffect(() => {
		const getCountriesData = async () => {
			const res = await fetch(COVID_TOTAL_CASE_URL + PATH_COUNTRIES);
			const data = await res.json();
			const countries = data.map((country) => {
				return {
					name: country.country, // Japan, United States
					value: country.countryInfo.iso2, // JP, USA
				};
			});
			const sortedData = sortData(data)
			setTableData(sortedData);
			setCountries(countries);
			setMapCountries(data)
		};
		getCountriesData();
	}, []);

	const onCountryChange = async (event) => {
		const countryCode = event.target.value;
		const url = countryCode === COUNTRY_CODE_WORLDWIDE
			? `${COVID_TOTAL_CASE_URL + PATH_WORLDWIDE}`
			: `${COVID_TOTAL_CASE_URL + PATH_COUNTRIES}/${countryCode}`
		const res = await fetch(url)
		const data = await res.json()
		const mapCenterPosition = countryCode === COUNTRY_CODE_WORLDWIDE
			? DEFAULT_LAT_LONG : [data.countryInfo.lat, data.countryInfo.long]

		setCountryCode(countryCode);
		setCountryInfo(data);
		recenterMapPosition(mapCenterPosition, 5)

	}

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
					<InfoBox isOrange isActive={casesType === "cases"} onClick={(e) => setCasesType('cases')} title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
					<InfoBox isGreen isActive={casesType === "recovered"} onClick={(e) => setCasesType('recovered')} title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
					<InfoBox isRed isActive={casesType === "deaths"} onClick={(e) => setCasesType('deaths')} title="Death" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
				</div>

				<Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
			</div>

			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3>Worldwide new {casesType}</h3>
					<LineGraph casesType={casesType} />
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
