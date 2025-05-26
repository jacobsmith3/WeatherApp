import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef  } from 'react';
const key = "ff0413e8f21947dd8b250043250705";

function App() {
  const [weatherData, setWeatherData] = useState(null); // Declare state
  async function fetchData(){
    try{
      const CityName = document.getElementById("CityName").value.toLowerCase();
      
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${CityName}&days=7`);
      
      if(!response.ok){ 
        throw new Error("Could not fetch Resource"); 
      }
      
      const data = await response.json();
      console.log(data);
      setWeatherData(data); // Update the state with the fetched data
    }
    catch(error){
      console.error(error);
    }
  }
  return (
    <div className="App">
      <header className='creditMe'>
        Made by Jacob Smith
      </header>
      <header className='App-header'>
        Weather App
      </header>
      <div className='weather-Info'>
        <input type='text' id='CityName' placeholder='Search For a City'></input>
        <button onClick={fetchData}>Fetch Weather</button><br></br>
        {weatherData ? (
        // Render weather data if weatherData is not null
        <div>
          <h2>Weather in {weatherData.location.name}</h2>
          <img alt={weatherData.current.condition.text} src={weatherData.current.condition.icon}></img>
           <p>Temperature: {weatherData.current.temp_f}°F</p> 
           <p>Condition: {weatherData.current.condition.text}</p> 
        </div>
        ) : (
        // Render a message when weatherData is null
        <p>Search for a city to see the weather.</p>
        )}
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
  );
}

export default App;
