import request from 'superagent';
import { API_PATH } from '../constant';

export function apiGet(url) {
  return new Promise((resolve, reject) => {
    return request
      .get(url)
      .withCredentials()
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function apiPost(url, data) {
  return new Promise((resolve, reject) => {
    return request
      .post(url)
      .send(data)
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}


export function apiDelete(url) {
  return new Promise((resolve, reject) => {
    return request
      .delete(url)
      .withCredentials()
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function apiPut(url, data) {
  return new Promise((resolve, reject) => {
    return request
      .put(url)
      .withCredentials()
      .send(data)
      .end((error, response) => {
        if (!error) {
          resolve(response);
        } else {
          reject(response);
        }
      });
  });
}

export function getResult(businessId, businessName) {
  const api = `${API_PATH}/api`;
  const requestData = {
    businessName: businessName,
    businessId: businessId
  }
  
  // eslint-disable-next-line no-unused-vars
  return (dispatch) => {
    apiPost(api, requestData)
      .then((res) => {
        // eslint-disable-next-line no-console
        const apiResonse = JSON.parse(res.text);
        if(apiResonse.status === 200) {
          dispatch({ type: 'API_DATA', result: apiResonse.data.results[0] });
          dispatch({ type: 'RESULT_STATUS', resultStatus: false });
        } else {
          dispatch({ type: 'RESULT_STATUS', resultStatus: true });
          dispatch({ type: 'API_DATA', result: {} });
          dispatch({ type: 'ERROR_API_REPONSE', errorReponse: apiResonse.message });
        }
      }).catch(() => {
        dispatch({ type: 'RESULT_STATUS', resultStatus: true });
        dispatch({ type: 'ERROR_API_REPONSE', errorReponse: "Please check your node server start or not." });
      })
  };
}

export function noData() {
  return (dispatch) => {
    dispatch({ type: 'ERROR_API_REPONSE', errorReponse: "Please Enter atleast BusinessId or BusinessName." });
  };
}
