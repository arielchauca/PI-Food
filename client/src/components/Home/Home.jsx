import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//importo componentes
import SearchBar from "../SearchBar/SearchBar";
import Recipes from "../Recipes/Recipes";
import Paginado from "../Paginado/Paginado";
//importo actions que voy a usar
import {
  getByTypes,
  getTypes,
  orderByName,
  orderByPuntuation,
  getRecipes,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './Home.module.css';
import loadingImg from '../../assets/img/loading.png';
import nofoods from '../../assets/img/nofoods.png';

function Home() {
  const [currenPage, setCurrenPage] = useState(1);

  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const recipes = useSelector((state) => state.recipesTypes);
  console.log(recipes.length)
  const loading = useSelector((state) => state.loading);

  //Paginados
  const recetasPorPagina = 9;
  const indexLastRecipe = currenPage * recetasPorPagina;
  const indexFirstRecipe = indexLastRecipe - recetasPorPagina;
  const currentRecipes = recipes.length
    ? recipes.slice(indexFirstRecipe, indexLastRecipe)
    : [];

  //Funcion para cambiar de pagina
  const page = (pageNumber) => {
    setCurrenPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getRecipes(""));
  }, [dispatch]);

  const navigate = useNavigate();

  const goCreate = () => {
    navigate("/create");
  };

  const handleByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
  };
  const handleByPuntuation = (e) => {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value));
  };

  const handleByTypes = (e) => {
    e.preventDefault();
    dispatch(getByTypes(e.target.value));
    setCurrenPage(1);
  };

  return (
    <div className={style.contenedor}>
      <SearchBar setCurrenPage={setCurrenPage} />
      <div className={style.contenedorFiltrado}>

        {/* Filtrar por tipos de dietas */}
        <select
          className={style.filtros}
          defaultValue="ALL"
          onChange={(e) => handleByTypes(e)}
        >
          <option value="ALL" disabled>
            Tipo de Dieta
          </option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Ordenar alfabeticamente */}
        <select
          className={style.filtros}
          defaultValue="ALL"
          onChange={(e) => handleByName(e)}
        >
          <option value="ALL" disabled>
            Ordenar alfabeticamente
          </option>
          <option value="asc">ascendente(A-Z)</option>
          <option value="des">descendente(Z-A)</option>
        </select>

        {/* Ordenar por Puntuacion */}
        <select
          className={style.filtros}
          defaultValue="ALL"
          onChange={(e) => handleByPuntuation(e)}
        >
          <option value="ALL" disabled>
            Ordenar por Puntuacion
          </option>
          <option value="Mayor">Mayor</option>
          <option value="Menor">Menor</option>
        </select>

        <button className={style.btnCreate} onClick={goCreate}>
          Crear receta
        </button>
      </div>

      { loading? (<>
      <img className={style.loading} src={loadingImg} alt="Loading..." />
      <h1>Cargando...</h1>
      </>): recipes.length > 0 ? (
        <>
          <Recipes recipes={currentRecipes} />
          <div>
            <Paginado recipes={recipes.length} page={page} />
          </div>
        </>
      ): (<> <img className={style.nofoods} src={nofoods} alt="No se encontraron recetas"/>
        <h1>No se encontraron recetas</h1>
      </>)}
    </div>
  );
}

export default Home;
