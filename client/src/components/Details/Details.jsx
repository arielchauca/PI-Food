import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeById } from "../../redux/actions";
import style from "./Details.module.css";
import logo from "../../assets/img/logo.png";

function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const recipe = useSelector((state) => state.recipe);
  console.log(recipe)
  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className={style.contenedor}>
      <div className={style.contenedorLogo}>
        <div className={style.goHome} onClick={goHome}>
          <img className={style.logo} src={logo} alt="Logo Foods"></img>
          <h1 className={style.titleNav}>Foods</h1>
        </div>
      <h3 className={style.name}>{recipe.name}</h3>
    </div>
      <div>
        <div className={style.contenedorTop}>
          <img
            className={style.img}
            src={recipe.image}
            alt={`imagen de ${recipe.name}`}
          />
          <h3>
            Puntuación: <span className={style.tag}>{recipe.puntuation}</span>
          </h3>
          <h3>
            Nivel de "comida saludable":
            <span className={style.tag}>{recipe.level}</span>
          </h3>
          <h3>
            Tipo de dieta:{" "}
            {recipe.diets?.map((d) => (
              <span className={style.diet}>{d.name}</span>
            ))}
          </h3>
        </div>
        <div className={style.contenedorPadre}>
          <div className={style.contenedorSteps}>
            <h3>Paso a paso:</h3>
            {recipe.steps !== "" ? <p>{recipe.steps}</p> : null}
          </div>
          <div className={style.contenedorResumen}>
            <h3>Resumen:</h3>{" "}
            <div className={style.resumen} dangerouslySetInnerHTML={{ __html: recipe.description }} />
            {/*dangerouslySetInnerHTML nos permite ingresar codigo HTML desde react pero puede ser peligroso 
                se puede exponer a los usuarios a ataques cross-site scripting(xss)
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
