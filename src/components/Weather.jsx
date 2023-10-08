import React, { useState } from "react";

import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import dizzle from "../assets/drizzle.png";
import humidity from "../assets/humidity.png";
import rain from "../assets/rain.png";
import search from "../assets/search.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";

function Weather() {

  let api_key = "dd94f859a0e52d6e4767fddf735f04a7"

  const [wicon, setWicon] = useState(cloud);

  const searchF = async () =>{
    const element = document.getElementsByClassName("searchInput");
    if(element[0].value === ""){                                                                                                                                                
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url);
    let data = await response.json();
    const hum = document.getElementsByClassName("humidityW")
    const win = document.getElementsByClassName("windW")
    const tem = document.getElementsByClassName("temperatureW")
    const loc = document.getElementsByClassName("locationW")

    hum[0].innerHTML = data.main.humidity + " %";
    win[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    tem[0].innerHTML = Math.floor(data.main.temp) + " °C";
    loc[0].innerHTML = data.name;

    if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
      setWicon(clear);
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
      setWicon(cloud);
    }
    else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
      setWicon(dizzle);
    }
    else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
      setWicon(dizzle);
    }
    else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
      setWicon(rain);
    }
    else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
      setWicon(rain);
    }
    else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
      setWicon(snow);
    }
    else{
      setWicon(clear);
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <div className={`card shadow bg-dark bg-opacity-75 p-4 my-5`}>
              <div className="card-body d-flex flex-column">
                <div className="container d-flex justify-content-between">
                    <input type="text" placeholder="Search" className="rounded-5 border-0 px-3 w-100 searchInput" style={{outline:'none'}}/>
                    <img src={search} alt="" className="bg-light p-3 rounded-5 ms-2" onClick={()=>{searchF()}} />
                </div>
                <div className="container d-flex justify-content-center ">
                  <img src={wicon} alt="" />
                </div>
                <div className="container text-white display-1 fw-semibold text-center temperatureW">24°C</div>
                <div className="container fs-1 text-white text-center locationW">London</div>
                <div className="container d-flex justify-content-between">
                  <div className="element d-flex">
                    <img src={humidity} className="py-5" alt="" />
                    <div className="container text-white text-center d-flex flex-column justify-content-center">
                      <h2 className="fw-normal humidityW">64%</h2>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="element d-flex">

                    <img src={wind} className="py-5 wind" alt="" />
                    <div className="container text-white text-center d-flex flex-column justify-content-center">
                      <h2 className="fw-normal windW">18km/h</h2>
                      <p>Wind Speed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
}

export default Weather;
