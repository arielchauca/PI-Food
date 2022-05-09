import React from "react";
import { Link } from "react-router-dom";
import style from './Recipe.module.css';

function Recipe({ image, name, diet, id }) {
  return (
    <div className={style.contenedor}>
      <Link to={`/details/${id}`} style={{textDecoration: 'none', color:'inherit'}}>
        <img className={style.image} src={image} alt={`imagen de ${name} no funciona`} />
        <h3 className={style.title}>{name}</h3>
        <div className={style.diets}>
          <h4>Tipo de dieta: </h4>
          {diet.map((d, i) => (
          <p key={i} className={style.diet}>{d.name}</p>
        ))}
          </div>
      </Link>
    </div>
  );
}

export default Recipe;
