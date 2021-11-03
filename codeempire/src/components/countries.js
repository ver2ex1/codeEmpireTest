import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";
import { Modal } from "./modal";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";

export const Countries = () => {
  const url = "https://api.covid19api.com/";
  const [state, setState] = useState({ countries: [] });
  useEffect(() => fetchData(), []);
  const fetchData = async () => {
    let result = await axios.get(`${url}summary`);
    let countr = result.data.Countries;
    setState({ ...state, countries: countr });
  };
  const [modalActive, setModalActive] = useState(false);
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState("");
  const [death, setDeath] = useState("");
  const [recovered, setRecovered] = useState("");
  const [text, setText] = useState("");
  const filteredCountries = state.countries.filter((country) => {
    return country.Country.toLowerCase().includes(text.toLowerCase());
  });
  return (
    <>
      <header className="mainHeader">
        <img className="logo" src="../logo.png" alt="" />
        <h1 className="stat">STATISTIC</h1>
        <TextField
          label="Search.."
          variant="outlined"
          margin="dense"
          style={{ marginTop: "30px", float: "right", marginRight: "40px" }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => setText("")}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </header>
      <div className="countries">
        <div className="headCountry">
          <p className="num">№</p>
          <p className="country">Country</p>
          <p className="total">Total confirmed</p>
        </div>
        {filteredCountries.map((list, index) => (
          <div
            className="countryDiv"
            onClick={() => (
              setModalActive(true),
              setName(list.Country),
              setConfirmed(list.TotalConfirmed),
              setDeath(list.TotalDeaths),
              setRecovered(list.TotalRecovered)
            )}
            key={index}
          >
            <p className="number">{index + 1}</p>
            <p className="name">
              <span> {list.Country} </span>
            </p>
            <p className="totalConf">{list.TotalConfirmed}</p>
          </div>
        ))}
        <Modal
          active={modalActive}
          setActive={setModalActive}
          name={name}
          confirmed={confirmed}
          death={death}
          recovered={recovered}
        />
      </div>
    </>
  );
};
