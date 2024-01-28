import { BASE_URL } from './config.js';

export const signUp = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      return response.json();
    })
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
};

export const signIn = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    credentials: "include",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.token) {
        localStorage.setItem('userId', data.token);
        return data;
      }
    })
    .catch(err => console.log(err));
};

export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(res => res.json())
    .then(data => data);
};
