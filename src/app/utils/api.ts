import { request as axios, RequestResponse } from '@app/utils/fetch';

export const getMessages = () => axios.get(`${API_BASE}messages/`);

export const postMessagesSeen = (uuids: Array<string>) =>
  axios.post(`${API_BASE}messages/seen/`, { messages: uuids });

export const getUser = () => axios.get(`${API_BASE}user/`);

export const postUser = data => axios.post(`${API_BASE}user/`, data);

export const postAuthLogout = () => axios.post(`${API_BASE}auth/logout/`);

export const postAuthSignIn = (uuid: string, password: string) =>
  axios.post(`${API_BASE}auth/signin/`, {
    uuid,
    password,
  });

export const postCampID = (number: string) =>
  axios.post(`${API_BASE}auth/resolve-camp-id/`, {
    id: number,
  });

export const putUser = (uuid: string, lang: string = '') =>
  axios.put(`${API_BASE}user/`, {
    uuid,
    ...(lang !== '' ? { lang } : {}),
  });

export const getLanguageStrings = (locale: string): Promise<RequestResponse> =>
  axios.get(`https://i18n.camp.nico.dev/${locale}/`);

export const getPushKey = (): Promise<any> => axios.get(`${API_BASE}push/key/`);
export const getPushKey2 = (): Promise<any> =>
  axios.get(`${API_BASE}push/keyeeee/`);

export const putSubscription = (subscription): Promise<RequestResponse> =>
  axios.put(`${API_BASE}subscription/`, subscription);
