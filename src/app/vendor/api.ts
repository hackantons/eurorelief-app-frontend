import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { wait } from '@app/vendor/helpers';
import { Identity } from '@app/store/types';
import { settingsDB } from '@app/store/idb';
import { IntlMessages } from '@app/intl/types';

const API_BASE = 'http://localhost:5080/';

const mockedIdentity: Identity = {
  id: '12345',
  phone: '789456123',
};

export const getNotifications = () =>
  new Promise((resolve, reject) =>
    wait(1500).then(() =>
      resolve([
        {
          date: '25.07.2020',
          text:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
        },
        {
          date: '25.07.2020',
          text:
            'tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
        },
        {
          date: '25.07.2020',
          text:
            'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren',
        },
      ])
    )
  );

export const getTickets = () =>
  new Promise((resolve, reject) =>
    wait(500).then(() =>
      resolve([
        {
          date: '20.07.2020',
          title: 'Lorem ipsum dolor',
          uuid: ' ea27954a-237b-4b85-8974-c2bb5d442256 ',
        },
        {
          date: '18.07.2020',
          title: 'tempor invidunt vero ',
          uuid: 'b539a1c1-e61a-4067-8e3b-2a31a8f10680 ',
        },
        {
          date: '16.07.2020',
          title: 'At vero eos et accusam',
          uuid: 'aeec2188-5f15-43e1-9f26-cb39f65fc902 ',
        },
      ])
    )
  );

export const getUser = () => axios.get(`${API_BASE}user/`);

export const postAuthSignIn = (uuid: string, password: string) =>
  axios.post(`${API_BASE}auth/signin/`, {
    uuid,
    password,
  });

export const postCampID = (number: string) =>
  axios.post(`${API_BASE}auth/resolve-camp-id/`, {
    id: number,
  });

export const putAccount = (uuid: string) =>
  axios.put(`${API_BASE}user/`, {
    uuid,
  });

export const getLanguageStrings = (locale: string): Promise<AxiosResponse> =>
  axios.get(`https://i18n.camp.nico.dev/${locale}/`);
