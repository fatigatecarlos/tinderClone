import {baseUrl} from './constants';
import {RequestParam, NetworkResponse, User} from '../utils/Types';

export const authRequest = async (
  method: string,
  url: string,
  params?: RequestParam,
): Promise<NetworkResponse<User>> => {
  const token = await fetch(baseUrl + url, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const json = await token.json();

  if (token.ok) {
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
