// src/redux/actions/userActions.js
export const setUser = (username, role) => ({
    type: 'SET_USER',
    payload: { username, role },
  });
  