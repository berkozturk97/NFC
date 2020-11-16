import axios from 'axios';
import Global from '../util/Global';

export const login = ({body=null}) => {
  return new Promise((resolve, reject) => {
    let REQUEST_URL = Global.BASE_URL + 'user/login';
    console.warn(body)
    axios
      .post(REQUEST_URL,body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(null);
        //console.warn(err);
      });
  });
};

export const register = ({body=null}) => {
    return new Promise((resolve, reject) => {
      let REQUEST_URL = Global.BASE_URL + 'user/addUser';
      console.warn(body)
      axios
        .post(REQUEST_URL,body)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(null);
          //console.warn(err);
        });
    });
  };
