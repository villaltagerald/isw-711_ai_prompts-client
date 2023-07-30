/*import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './Reducers/Index'; // Importa el rootReducer de tu aplicación

const store = configureStore({
  reducer: RootReducer,
  // Puedes agregar otras opciones aquí si es necesario
});

export default store;*/

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import RootReducer from './Reducers/Index';

// Función para cargar el estado guardado en el almacenamiento local
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Función para guardar el estado en el almacenamiento local
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    // Manejo de errores al guardar el estado en el almacenamiento local
  }
};

// Crea el store utilizando el estado cargado del almacenamiento local
const store = configureStore({
  reducer: RootReducer,
  preloadedState: loadStateFromLocalStorage(), // Cargamos el estado inicial desde el almacenamiento local
});

// Suscribe una función al store para guardar el estado en el almacenamiento local cada vez que cambie
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
