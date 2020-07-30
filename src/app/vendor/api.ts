import { wait } from '@app/vendor/helpers';
import { Identity } from '@app/store/types';
import { settingsDB } from '@app/store/idb';

const mockedIdentity: Identity = {
  id: '12345',
  phone: '789456123',
};

export const logIn = ({
  tel,
  password,
}: {
  tel: string;
  password: string;
}): Promise<Identity> =>
  new Promise((resolve, reject) => {
    wait().then(() => {
      if (tel === '1234' && password === 'test') {
        settingsDB.set(
          'jwt',
          'JWT.Loremipsumdolorsitametconsetetursadipscingelitr'
        );
        resolve(mockedIdentity);
      } else {
        reject();
      }
    });
  });

export const validateToken = (token: string): Promise<Identity> =>
  new Promise((resolve, reject) => {
    if (token) {
      wait().then(() => resolve(mockedIdentity));
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

export const checkKANumber = (number: string, formatMessage): Promise<string> =>
  new Promise((resolve, reject) =>
    wait(500).then(() => {
      if (number === '00/000000') {
        reject(new Error(formatMessage({ id: 'onboarding.number.invalid' })));
      } else {
        resolve('aeec2188-5f15-43e1-9f26-cb39f65fc902');
      }
    })
  );
