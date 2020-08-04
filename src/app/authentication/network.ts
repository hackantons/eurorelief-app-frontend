import {
  putUser,
  postUser,
  postCampID,
  postAuthSignIn,
  getUser,
} from '@app/vendor/api';
import { Identity } from '@app/store/types';

export const fetchUser = (): Promise<Identity> =>
  new Promise((resolve, reject) =>
    getUser()
      .then(res => resolve(res.data))
      .catch(e => reject(e))
  );

export const updateUser = (data): Promise<Identity> =>
  new Promise((resolve, reject) =>
    postUser(data)
      .then(res => resolve(res.data))
      .catch(e => reject(e))
  );

export const signIn = (uuid: string, password: string): Promise<string> =>
  new Promise((resolve, reject) =>
    postAuthSignIn(uuid, password)
      .then(res => {
        resolve(res.data.jwt);
      })
      .catch(e => reject(e))
  );

export const createUser = (
  uuid: string
): Promise<{ user: string; password: string }> =>
  new Promise((resolve, reject) =>
    putUser(uuid)
      .then(res => resolve(res.data))
      .catch(e => reject(e))
  );

export const resolveCampID = (number: string): Promise<string> =>
  new Promise((resolve, reject) =>
    postCampID(number)
      .then(res => resolve(res.data.uuid))
      .catch(e => reject(e))
  );
