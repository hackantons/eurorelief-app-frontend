import { wait } from '@app/vendor/helpers';

export const logIn = ({ tel, password }: { tel: string; password: string }) =>
  new Promise((resolve, reject) => {
    console.log('logIn', tel, password);
    wait().then(() => {
      if (tel === '1234' && password === 'test') {
        resolve({
          jwt: 'JWT.Loremipsumdolorsitametconsetetursadipscingelitr',
          id: '12345',
        });
      } else {
        reject();
      }
    });
  });

export const validateToken = (token: string) =>
  new Promise((resolve, reject) => {
    console.log('validateToken', token);
    if (token) {
      wait().then(() => resolve({ id: '05/1234567890' }));
    } else {
      reject();
    }
  });

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
