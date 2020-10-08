// import {
//   Card,
//   CardContent,
//   FormControl,
//   MenuItem,
//   Select,
// } from "@material-ui/core";
// import React, { useEffect, useState } from "react";
// import "./App.css";
// import LineGraph from "./Components/Graph/LineGraph";
// import InfoBox from "./Components/InfoBox/InfoBox";
// import Map from "./Components/Map/Map";
// import Table from "./Components/Table/Table";
// import { sortData } from "./util";
// import "leaflet/dist/leaflet.css";

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [country, setCountry] = useState("worldwide");
//   const [countryInfo, setCountryInfo] = useState({});
//   const [tableData, setTableData] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
//   const [mapZoom, setMapZoom] = useState(3);

//   useEffect(() => {
//     fetch("https://disease.sh/v3/covid-19/all")
//       .then((response) => response.json())
//       .then((data) => {
//         setCountryInfo(data);
//       });
//   }, []);

//   useEffect(() => {
//     const getCountriesData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/countries")
//         .then((response) => response.json())
//         .then((data) => {
//           const countries = data.map((country) => ({
//             name: country.country,
//             value: country.countryInfo.iso2,
//           }));

//           const sortedData = sortData(data);

//           setTableData(sortedData);

//           setCountries(countries);
//         });
//     };
//     getCountriesData();
//   }, []);

//   const onCountryChange = async (event) => {
//     const countryCode = event.target.value;

//     setCountry(countryCode);

//     const url =
//       countryCode === "worldwide"
//         ? `https://disease.sh/v3/covid-19/all`
//         : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

//     await fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setCountry(countryCode);
//         setCountryInfo(data);

//         setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
//         setMapZoom(4);
//       });
//   };

//   return (
//     <div className="app">
//       <div className="app__left">
//         <div className="app__header">
//           <h1>COVID-19 TRACKER</h1>
//           <FormControl className="app__dropdown">
//             <Select
//               variant="outlined"
//               onChange={onCountryChange}
//               value={country}
//             >
//               <MenuItem value="worldwide">WorldWide</MenuItem>
//               {countries.map((country) => (
//                 <MenuItem value={country.value}>{country.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//         <div className="app__stats">
//           <InfoBox
//             title="Coronavirus Cases"
//             cases={countryInfo.todayCases}
//             total={countryInfo.cases}
//           />
//           <InfoBox
//             title="Recovered"
//             cases={countryInfo.todayRecovered}
//             total={countryInfo.recovered}
//           />
//           <InfoBox
//             title="Deaths"
//             cases={countryInfo.todayDeaths}
//             total={countryInfo.deaths}
//           />
//         </div>
//         <Map center={mapCenter} zoom={mapZoom} />
//       </div>
//       <Card className="app__right">
//         <CardContent>
//           <h3>Live Cases by Country</h3>
//           <Table countries={tableData} />
//           <h3>worldWide new cases</h3>
//           <LineGraph />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Card,
  CardContent,
  Select,
} from "@material-ui/core";
import "./App.css";
// import InfoBox from ".Components/InfoBox/InfoBox";
import Map from "./Components/Map/Map";
import { sortData, prettyPrintState } from "./util";
import Table from "./Components/Table/Table";
import LineGraph from "./Components/Graph/LineGraph";
import "leaflet/dist/leaflet.css";
import InfoBox from "./Components/InfoBox/InfoBox";

//https://covid19-tracker-e42ba.web.app

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });

  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 tracker</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem value={country.value} key={index}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* header */}
        {/* tittle + select input dropdown field */}

        {/* info Boxs */}
        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintState(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintState(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintState(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
        </div>
        {/* table */}
        {/* Graph */}
        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__graphtitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;