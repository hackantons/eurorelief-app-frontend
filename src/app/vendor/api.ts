import { wait } from '@app/vendor/helpers';

export const logIn = ({ tel, password }: { tel: string; password: string }) =>
  new Promise(resolve => {
    console.log('logIn', tel, password);
    wait().then(() =>
      resolve({
        jwt: 'JWT.Loremipsumdolorsitametconsetetursadipscingelitr',
        id: '12345',
      })
    );
  });

export const validateToken = (token: string) =>
  new Promise((resolve, reject) => {
    console.log('validateToken', token);
    if (token) {
      wait().then(() => resolve({ id: '12345' }));
    } else {
      reject();
    }
  });
