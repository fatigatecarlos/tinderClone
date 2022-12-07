import {baseUrl} from './constants';
import {NetworkResponse, User} from '../utils/Types';
import axios from 'axios';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosRequest = async (
  method: string,
  url: string,
  params?: any,
  token?: string,
): Promise<NetworkResponse<User>> => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  const response = await instance({
    method: method,
    url: url,
    data: params,
  });

  console.log(response);
};

export const authRequest = async (
  method: string,
  url: string,
  params?: any,
  token?: string,
): Promise<NetworkResponse<User>> => {
  let bearerToken = null;
  if (token) {
    bearerToken = `Bearer ${token}`;
  }
  console.log('aki');
  const response = await fetch(baseUrl + url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: bearerToken,
    },
    body: JSON.stringify(params),
  });
  console.log('response');
  console.log(response);
  const json = await response.json();
  console.log('json');
  console.log(json);
  if (response.ok) {
    return {
      kind: 'success',
      body: json.data,
    };
  }
  return {
    kind: 'failure',
    body: json.message,
  };
};
