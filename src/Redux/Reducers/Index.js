// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import UserReducer from './UserReducer'; // Importa tus reducers aquí

const RootReducer = combineReducers({
  user: UserReducer, // Define cómo se maneja el estado del usuario en el reducer "userReducer"
  // ... otros reducers
});

export default RootReducer;
