import React from "react";
import style from "./Landing.module.css";
import { useNavigate } from "react-router-dom";
import github from "../../assets/img/github.png";
import linkedin from "../../assets/img/linkedin.png";

function Landing() {
  const navigate = useNavigate();

  const push = () => {
    setTimeout(function () {
      navigate("/home");
    }, 500);
  };

  return (
    <div className={style.landing}>
      <h1 className={style.title}>Foods</h1>
      <div className={style.containerLogo}>
        <a href="https://github.com/arielchauca" target="_blank" rel="noopener noreferrer">
          <img src={github} className={style.logo} alt="logo github" />
        </a>
        <a href="https://www.linkedin.com/in/ivan-chauca/" target="_blank" rel="noopener noreferrer">
          <img src={linkedin} className={style.logo} alt="logo linkedin" />
        </a>
      </div>
      <div className={style.container}>
        <button className={style.btn} onClick={push}>
          Entrar!
        </button>
      </div>
    </div>
  );
}

export default Landing;
