import api from './api';

export const BASE_URL = 'http://localhost:3000';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return api.getResponseData(res);
  })
  .then((res) => {
    return res;
  })

};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  }).then(res => {
    return api.getResponseData(res)})

};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    return api.getResponseData(res); 
    // сначала на бэке отработает 
    // мидлвара auth, которая вернет 401 если 
    // пользователь неавторизован, потом отработает 
    // метод getInfoAboutMe, который вернет {
    //   name, about, avatar, _id, email
    // }
  })
  .then(data => data)
}
