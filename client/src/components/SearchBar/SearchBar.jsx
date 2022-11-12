import React, { useState } from "react";
import { getRecipes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import style from "./SearchBar.module.css";
import logo from "../../assets/img/logo.png";

function SearchBar({ setCurrenPage }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(getRecipes(input));
    setCurrenPage(1);
  };

  return (
    <div className={style.contenedor}>
      <div
        onClick={() => window.location.reload()}
        className={style.contenedorTitle}
      >
        <img className={style.logo} src={logo} alt="Logo Foods"></img>
        <h1 className={style.title}>Foods</h1>
      </div>
      <input
        className={style.buscar}
        type="text"
        value={input}
        placeholder="Buscar"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className={style.btn} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
