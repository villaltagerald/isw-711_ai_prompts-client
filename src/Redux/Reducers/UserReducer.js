// src/redux/reducers/userReducer.js
const initialState = {
    username: '',
    role: '',
  };
  
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          username: action.payload.username,
          role: action.payload.role,
        };
      default:
        return state;
    }
  };
  
  export default UserReducer;
  