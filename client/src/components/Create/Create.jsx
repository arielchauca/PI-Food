import React, { useEffect, useState } from "react";
import { getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import style from "./Create.module.css";
import logo from "../../assets/img/logo.png";

function Create() {
  //Estados locales donde manejaremos los datos de cada receta a crear
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    puntuation: "",
    level: "",
    steps: "",
    image: "",
    diet: [],
  });

  //Estados locales donde manejaremos los errores
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    puntuation: "",
    level: "",
    steps: "",
    image: "",
    diet: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tipos = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const goHome = () => {
    navigate("/home");
  };

  //Funcion que se ejecuta al cambiar el valor de cada input
  const handleChange = (e) => {
    e.preventDefault();
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  //Funcion para agregar tipos de dietas a la receta
  const handleDiet = (e) => {
    setRecipe({
      ...recipe,
      diet: recipe.diet.includes(e.target.value)
        ? recipe.diet.filter((diet) => diet !== e.target.value)
        : recipe.diet.concat(e.target.value),
    });
  };

  //prueba
  const dietas = [
    "vegetarian",
    "vegan",
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "paleolithic",
    "primal",
    "pescatarian",
    "fodmap friendly",
    "whole 30",
    "ketogenic",
  ];


  //Funcion que maneja cuando el usuario selecciona el foco en el input
  const handleBlur = (e) => {
    //Validar el campo name
    if (e.target.name === "name") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          name: "Por favor ingrese un nombre",
        });
      } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(e.target.value)) {
        setErrors({
          ...errors,
          name: "Por favor ingrese un nombre sin numeros o caracteres especiales",
        });
      } else {
        setErrors({
          ...errors,
          name: "",
        });
      }
    }

    //Validar el campo de descripcion
    if (e.target.name === "description") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          description: "Por favor ingrese una descripcion de la receta",
        });
      } else {
        setErrors({
          ...errors,
          description: "",
        });
      }
    }

    //Validar el campo de puntuacion no numeros negativos ni mayores a 100
    if (e.target.name === "puntuation") {
      if (e.target.value === "0") {
        setErrors({
          ...errors,
          puntuation: "Por favor ingrese una puntuacion a la receta",
        });
      } else if (e.target.value < 0 || e.target.value > 100) {
        setErrors({
          ...errors,
          puntuation: "El valor a ingresar no puede ser negativo o mayor a 100",
        });
      } else if (!/^([0-9])*$/.test(e.target.value)){
        setErrors({
          ...errors,
          puntuation: "El valor ingresado tiene que ser un numero"
        })
      }else {
        setErrors({
          ...errors,
          puntuation: "",
        });
      }
    }

    //Validar el campo de imagen
    if (e.target.name === "image") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          image: "Por favor ingrese una imagen para su receta",
        });
      } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(e.target.value)) {
        setErrors({
          ...errors,
          image: "Por favor ingrese una URL valida",
        });
      } else {
        setErrors({
          ...errors,
          image: "",
        });
      }
    }

    //Validar el campo de nivel de salud
    if (e.target.name === "level") {
      if (e.target.value === "0") {
        setErrors({
          ...errors,
          level: "Por favor ingrese un nivel de salud de la receta",
        });
      } else if (e.target.value < 0 || e.target.value > 100) {
        setErrors({
          ...errors,
          level: "El valor a ingresar no puede ser negativo o mayor a 100",
        });
      }else if (!/^([0-9])*$/.test(e.target.value)){
        setErrors({
          ...errors,
          level: "El valor ingresado tiene que ser un numero"
        }) 
       } else {
        setErrors({
          ...errors,
          level: "",
        });
      }
    }
    //Validar el campo de steps
    if (e.target.name === "steps") {
      if (e.target.value === "") {
        setErrors({
          ...errors,
          steps: "Por favor ingrese los pasos para preparar la receta",
        });
      } else {
        setErrors({
          ...errors,
          steps: "",
        });
      }
    }

    //Validar checkbox de diet
    if (e.target.name === "diet") {
      if (recipe.diet.length <= 0 ) {
        setErrors({
          ...errors,
          diet: "Por favor ingrese por lo menos una dieta",
        });
   }
   let prueba = recipe.diet.filter(a => !dietas.includes(a))
   console.log(prueba)
   if (prueba.length > 0){
      setErrors({
        ...errors,
        diet: "La dieta ingresada debe ser una de la lista"
      })  
      } else {
        setErrors({
          ...errors,
          diet: "",
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validar el formulario si tiene errores o no
    if (
      recipe.name === "" ||
      recipe.description === "" ||
      recipe.puntuation === "" ||
      recipe.level === "" ||
      recipe.steps === "" ||
      recipe.image === "" ||
      recipe.diet.length === 0
    ) {
      setErrors({
        name: recipe.name === "" ? "Por favor ingrese un nombre" : "",
        description:
          recipe.description === ""
            ? "Por favor ingrese una descripcion de la receta"
            : "",
        puntuation:
          recipe.puntuation === ""
            ? "Por favor ingrese una puntuacion a la receta"
            : "",
        level:
          recipe.level === ""
            ? "Por favor ingrese un nivel de salud de la receta"
            : "",
        steps:
          recipe.steps === ""
            ? "Por favor ingrese los pasos para preparar la receta"
            : "",
        image:
          recipe.image === ""
            ? "Por favor ingrese una imagen para su receta"
            : "",
        diet:
          recipe.diet.length === 0
            ? "Por favor ingrese por lo menos una dieta"
            : "",
      });
      return;
    } else if (
      errors.name !== "" ||
      errors.description !== "" ||
      errors.puntuation !== "" ||
      errors.level !== "" ||
      errors.steps !== "" ||
      errors.image !== "" ||
      errors.diet !== ""
    ) {
      alert("Por favor corrija los errores en el formulario para continuar");
      return;
    }
    dispatch(postRecipe(recipe));
    alert("La receta fue creada con exito!");
    //paso los valores del checkbox a vacio
    for (let i = 0; i < recipe.diet.length; i++) {
      document.getElementById(recipe.diet[i]).checked = false;
    }
    //vuelvo todos los valores a vacio
    setRecipe({
      name: "",
      description: "",
      puntuation: "",
      level: "",
      steps: "",
      image: "",
      diet: [],
    });
  };

  return (
    <div className={style.contenedor}>
      <div onClick={goHome} className={style.contenedorLogo}>
        <div className={style.contenedorLogoHijo}>
          <img className={style.logo} src={logo} alt="Logo Foods"></img>
          <h1 className={style.title}>Foods</h1>
        </div>
      </div>

      <form
        className={style.formulario}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1 className={style.crear}>Crea una receta</h1>
        <div className={style.contenedorFormularioHijo}>
          {/* Input de nombre de la receta a crear */}
          <label>Nombre: </label>
          <input
            className={style.text}
            type="text"
            placeholder="Nombre"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <p className={style.error}>{errors.name}</p>}
          <br />

          {/* Input de descripcion de la receta */}
          <label>Descripcion: </label>
          <input
            className={style.text}
            type="text"
            placeholder="Descripcion"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && <p className={style.error}>{errors.description}</p>}
          <br />

          {/* Input tipo Number para calificar una receta */}
          <label>Puntuacion: </label>
          <input
            className={style.number}
            type="Number"
            name="puntuation"
            value={recipe.puntuation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.puntuation && <p className={style.error}>{errors.puntuation}</p>}
          <br />

          <label>Imagen: </label>
          <input
            type="url"
            className={style.text}
            placeholder="url"
            name="image"
            id="image"
            value={recipe.image}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.image && <p className={style.error}>{errors.image}</p>}
          <br />

          <label>Nivel de "comida saludable": </label>
          <input
            className={style.number}
            type="Number"
            name="level"
            value={recipe.level}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.level && <p className={style.error}>{errors.level}</p>}
          <br />

          <label>Paso a Paso: </label>
          <input
            className={style.text}
            type="text"
            placeholder="Paso a Paso"
            name="steps"
            value={recipe.steps}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.steps && <p className={style.error}>{errors.steps}</p>}
          <br />

          {/* input de tipo checkbox donde seleccionaremos almenos 1 tipo de dieta*/}
          <label>Tipo de dieta: </label>
          <div className={style.diets}>
          {tipos.map((tipo, i) => (
            <>
              <input
                key={i}
                className={style.diet}
                type="checkbox"
                name="diet"
                id={tipo.name}
                value={tipo.name}
                onChange={handleDiet}
                onBlur={handleBlur}
              />
              <label className={style.check} htmlFor={tipo.name}>{tipo.name}</label>
              <br />
            </>
          ))}
          {errors.diet && <p className={style.error}>{errors.diet}</p>}
          </div>
          <br />
          {/* Boton para crear la nueva receta */}
          <input className={style.btn} type="submit" value="Crear" />
        </div>
      </form>
      <button className={style.btn} type="submit" onClick={goHome}>
        Volver
      </button>
    </div>
  );
}

export default Create;
