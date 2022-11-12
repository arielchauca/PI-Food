//creo toda la configuracion de redux para el store
import { configureStore } from '@reduxjs/toolkit';
// configureStore envuelve el metodo de la biblioteca Redux createStore() y el combineReducers()
// y maneja la mayor parte de la configuracion automaticamente incluido thunk
import rootReducer from './reducer';

const store = configureStore({ reducer: rootReducer });

export default store;