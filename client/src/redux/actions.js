import { GET_RECIPES, GET_BY_ID, GET_TYPES, ORDER_BY_NAME, GET_BY_TYPES, ORDER_BY_LEVEL, LOADING } from "./types";
import axios from "axios";

export const getRecipes = (name) => {
    return  async function (dispatch) {
        dispatch({
            type: LOADING,
        });
    try{
        return await axios.get(`/recipes?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_RECIPES,
                    payload: response.data,
                });
            }); 
        }catch(error){
            console.log(error)
        }
    }
}

export const getRecipeById = (id) => async (dispatch) => {
    return await axios.get(`/recipes/${id}`)
        .then((response) => {
            dispatch({
                type: GET_BY_ID,
                payload: response.data,
            });
        });
}


export const getTypes = () => async (dispatch) => {
    return await axios.get(`/types`)
    .then(response => {
        dispatch({
            type: GET_TYPES,
            payload: response.data,
        })
    }) 
}

export const postRecipe = (recipe) => async () => {
   return await axios.post(`/recipes`, recipe);
};

export const orderByName = (order) => {
    return {
        type: ORDER_BY_NAME,
        payload: order,
    }
};

export const getByTypes = (tipos) => {
    return {
        type: GET_BY_TYPES,
        payload: tipos
    }
}

export const orderByPuntuation = (order) => {
    return {
        type: ORDER_BY_LEVEL,
        payload: order
    }
}