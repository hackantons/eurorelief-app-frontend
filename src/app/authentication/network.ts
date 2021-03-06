import {
  putUser,
  postUser,
  postCampID,
  postAuthSignIn,
  getUser,
} from '@app/utils/api';
import { Identity } from '@app/store/types';

export const fetchUser = (): Promise<Identity> =>
  new Promise((resolve, reject) =>
    getUser()
      .then(res => resolve(res))
      .catch(e => reject(e))
  );

export const updateUser = (data): Promise<Identity> =>
  new Promise((resolve, reject) =>
    postUser(data)
      .then(res => resolve(res))
      .catch(e => reject(e))
  );

export const signIn = (uuid: string, password: string): Promise<string> =>
  new Promise((resolve, reject) =>
    postAuthSignIn(uuid, password)
      .then(res => {
        resolve(res.jwt);
      })
      .catch(e => reject(e))
  );

export const createUser = (
  uuid: string,
  lang: string = ''
): Promise<{ user: string; password: string }> =>
  new Promise((resolve, reject) =>
    putUser(uuid, lang)
      .then(res => resolve(res))
      .catch(e => reject(e))
  );

export const resolveCampID = (number: string): Promise<string> =>
  new Promise((resolve, reject) =>
    postCampID(number)
      .then(res => resolve(res.uuid))
      .catch(e => reject(e))
  );
