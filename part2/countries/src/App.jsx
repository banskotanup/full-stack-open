import { useEffect, useState } from "react";
import axios from "axios";

const CountryDisplay = ({ countries, handleShowClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((c) => {
          return (
            <div key={c.cca3}>
              <div>
                {c.name.common}{" "}
                <button onClick={() => handleShowClick(c.name.common)}>
                  Show
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  if (countries.length === 1) {
    return (
      <div>
        {countries.map((country) => {
          return (
            <div key={country.cca3}>
              <h2>{country.name.common}</h2>

              <p>
                <strong>Capital:</strong> {country.capital?.[0]}
              </p>
              <p>
                <strong>Area:</strong> {country.area}
              </p>
              <p>
                <strong>Population:</strong> {country.population}
              </p>

              <h3>Languages:</h3>
              <ul>
                {Object.values(country.languages || {}).map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>

              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width="150"
              />
            </div>
          );
        })}
      </div>
    );
  }
};

const WeatherDisplay = ({ capital, weather, icon, desc }) => {
  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>Temperature {weather?.main?.temp} Celsius</p>
      <p>icon</p>
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={desc || "weather icon"}
        />
      )}
      <p>Wind { weather?.wind?.speed} m/s</p>
    </div>
  );
};

function App() {
  const [countryData, setCountryData] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;
  console.log(api_key);
  const capital = countryData.length === 1 ? countryData[0].capital?.[0] : null;
  console.log(capital);

  useEffect(() => {
    if (newCountry === "") {
      setCountryData([]);
      return;
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        const filteredData =
          newCountry.trim() === ""
            ? []
            : data.filter((d) => {
                return d.name.common
                  .toLowerCase()
                  .includes(newCountry.trim().toLowerCase());
              });
        setCountryData(filteredData);
      })
      .catch((err) => {
        setCountryData([]);
      });
  }, [newCountry]);

  useEffect(() => {
    if (!capital) {
      return;
    }

    const fetchWeather = async () => {
      try {
        // 1. Get coordinates of the capital
        const geoRes = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            capital,
          )}&limit=1&appid=${api_key}`,
        );

        if (!geoRes.data || geoRes.data.length === 0) {
          console.log("Error fetching location.");
          return;
        }

        const { lat, lon } = geoRes.data[0];

        // 2. Get weather using coordinates
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
        );
        console.log(weatherRes);

        setWeather(weatherRes.data);
      } catch (error) {
        console.log("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [capital, api_key]);

  const icon = weather?.weather?.[0]?.icon;
  const desc = weather?.weather?.[0]?.description;

  const handleInputChange = (e) => {
    const newCountryValue = e.target.value;
    setNewCountry(newCountryValue);
  };

  const handleShowClick = (countryName) => {
    setNewCountry(countryName);
  };

  return (
    <div>
      find countries <input value={newCountry} onChange={handleInputChange} />
      <CountryDisplay
        countries={countryData}
        handleShowClick={handleShowClick}
      />
      {capital && <WeatherDisplay capital={capital} weather={weather} icon={icon} desc={ desc } />}
    </div>
  );
}

export default App;
