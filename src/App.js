import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";

function App() {
  const [degrees, setDegrees] = useState(null);
  const [location, setLocation] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [des, setDes] = useState("");
  const [icon, setIcon] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [country, setCountry] = useState("");
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();

    try{
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );
  
      const data = await res.data;
  
      setDegrees(data.main.temp);
      setLocation(data.name);
      setDes(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);
  
      setDataFetched(true);
  
      console.log(data);
    }catch(err){
      console.log(err);
      alert("Please enter a valid location!")
    }

    
  };

  const defaultDataFetch = async () => {
    if (!dataFetched) {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const data = await res.data;

      setDegrees(data.main.temp);
      setLocation(data.name);
      setDes(data.weather[0].description);
      setIcon(data.weather[0].icon);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setCountry(data.sys.country);

      console.log(data);
    }
  };

  useEffect(() => {
    //fetchData();
    defaultDataFetch();
  }, []);

  return (
    <div className="App">
      <div className="weather">
        <Input
          text={(e) => setUserLocation(e.target.value)}
          submit={fetchData}
          func={fetchData}
        />
        <div className="weather-display">
          <h3 className="weather-location">Weather in {location}</h3>

          <div>
            <h1 className="weather-degrees">{degrees} °C</h1>
          </div>

          <div className="weather-des">
            <div>
              <div className="weather-des-head">
                <span className="weather-icon">
                  <img
                    src={`http://openweathermap.org/img/w/${icon}.png`}
                    alt="weather icon"
                  />
                </span>
                <h3>{des}</h3>
              </div>
              <h3>Huminity: {humidity}%</h3>
              <h3>Wind speed: {wind} m/s</h3>
            </div>

            <div className="weather-country">
              <h3>{country}</h3>
              <h2 className="weather-date">3/30/2022, 2:03:12 AM</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
