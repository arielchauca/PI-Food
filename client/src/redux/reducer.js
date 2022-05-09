import {
  GET_BY_ID,
  GET_RECIPES,
  GET_TYPES,
  ORDER_BY_NAME,
  GET_BY_TYPES,
  ORDER_BY_LEVEL,
  LOADING
} from "./types";

const initialState = {
  recipes: [],
  recipe: {},
  types: [],
  recipesTypes: [],
  loading: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesTypes: action.payload,
        loading: false
      };
    case GET_BY_ID:
      return {
        ...state,
        recipe: action.payload,
        loading: false
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case GET_BY_TYPES:
      let orderByDiet = state.recipes.filter(recipe =>
        recipe.diets.find(d => d.name === action.payload)
      )
      return {
        ...state,
        recipesTypes: orderByDiet,
      };

      case ORDER_BY_NAME :
            let order = action.payload === 'asc' ? 
            [...state.recipesTypes].sort(function(a,b) {
                
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                  
                    return 1
                }
                if( b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1
                }
                return 0
            }) : 
            [...state.recipesTypes].sort(function(a,b) {
                if(a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
                if( b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                recipesTypes : order

        }
    case ORDER_BY_LEVEL:
      let orderByPuntuation;
      if (action.payload === "Mayor") {
        orderByPuntuation = [...state.recipesTypes].sort(function (a, b) {
          if (a.puntuation < b.puntuation) {
            return -1;
          }
          if (a.puntuation > b.puntuation) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === "Menor") {
        orderByPuntuation = [...state.recipesTypes].sort(function (a, b) {
          if (a.puntuation > b.puntuation) {
            return -1;
          }
          if (a.puntuation < b.puntuation) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        recipesTypes: orderByPuntuation,
      };
      case LOADING:
        return {
          ...state,
          loading: true
      }
    default:
      return state;
  }
}

export default rootReducer;
