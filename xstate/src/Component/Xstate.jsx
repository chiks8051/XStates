import React, { useEffect, useState } from "react";
import "./Xstate.css";
import axios from "axios";

const Xstate = () => {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountry = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountry(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleSelectedCountry = async (event) => {
    setSelectedCountry(event.target.value);
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${event.target.value}/states`
      );
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedState = async (event) => {
    setSelectedState(event.target.value);
    try {
      const city = await axios.get(
        ` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${event.target.value}/cities`
      );
      setCity(city.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedCity = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="xstate">
      <h1>Select location</h1>
      <select
        name="countries"
        id="countries"
        value={selectedCountry}
        onChange={handleSelectedCountry}
        className="slelect"
      >
        <option value="" disabled selected>
          Select Country
        </option>
        {country.map((cnty, index) => (
          <option key={index} value={cnty}>
            {cnty}
          </option>
        ))}
      </select>

      <select
        name="states"
        id="states"
        value={selectedState}
        onChange={handleSelectedState}
        disabled={!selectedCountry}
        className="slelect"
      >
        <option value="" disabled selected>
          Select State
        </option>
        {state.map((ste, index) => (
          <option key={index} value={ste}>
            {ste}
          </option>
        ))}
      </select>

      <select
        name="cities"
        id="cities"
        value={selectedCity}
        onChange={handleSelectedCity}
        disabled={!selectedState}
        className="slelect"
      >
        <option value="" disabled selected>
          {" "}
          Select City
        </option>
        {city.map((cty, index) => (
          <option key={index} value={cty}>
            {cty}
          </option>
        ))}
      </select>

      {selectedCity && (
        <div style={{ display: "inline" }}>
          <p style={{ fontSize: "40px" }}>
            You selected <b>{selectedCity}</b>,{" "}
            <span style={{ color: "gray" }}>
              {selectedState}, {selectedCountry}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Xstate;
