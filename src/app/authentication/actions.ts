import { settingsDB } from '@app/store/idb';
import { signIn as networkSignIn } from './network';
import axios from 'axios';

const generateJWT = (): Promise<string> =>
  new Promise((resolve, reject) => {
    Promise.all([settingsDB.get('user'), settingsDB.get('password')])
      .then(([user, password]) => {
        if (!user || !password) {
          reject();
        } else {
          networkSignIn(user, password)
            .then(jwt => resolve(jwt))
            .catch(e => reject(e));
        }
      })
      .catch(e => {
        reject(e);
      });
  });

export const doSignIn = (): Promise<boolean> =>
  new Promise((resolve, reject) => {
    settingsDB.get('jwt').then(jwt => {
      if (!jwt) {
        generateJWT()
          .then(jwt => {
            settingsDB.set('jwt', jwt);
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            resolve(true);
          })
          .catch(e => reject(e));
      } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        resolve(true);
      }
    });
  });
