import React from "react";
import Recipe from "./Recipe";
import style from "./Recipes.module.css";
import nofoods from '../../assets/img/nofoods.png';

function Recipes({recipes}) {

  return (
    <div className={style.contenedorPadre}>
      { recipes === false ?(<div className={style.nofoods}><img clasName={style.imagen} src={nofoods} alt="No se encontraron"/>
        <h1>No se encontraron recetas</h1>
      </div>) : recipes.map((recipe) => (
        <Recipe
          key={recipe.id}
          image={recipe.image}
          name={recipe.name}
          diet={recipe.diets}
          id={recipe.id}
        />
      )) }
    </div>
  );
}

export default Recipes;
