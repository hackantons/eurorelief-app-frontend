import { putSubscription } from '@app/utils/api';

export const isDev: boolean = window.location.href.indexOf('localhost') !== -1;

export const nl2br = (str: string = '') =>
  str === '' ? '' : (str + '').replace(/(\r\n|\n\r|\r|\n)/g, '<br>$1');

const ids: Object = {};
export const unique = (key: string, scope: string = 'global'): string => {
  if (ids[scope] === undefined) {
    ids[scope] = [];
  }

  let id = key;
  let idNum: number = 1;
  while (ids[scope].indexOf(id) !== -1) {
    id = key + '-' + idNum;
    idNum++;
  }

  ids[scope].push(id);
  return id;
};

export const subscribeToPush = (swRegistration, applicationServerKey) =>
  new Promise((resolve, reject) => {
    if (
      swRegistration &&
      'pushManager' in swRegistration &&
      applicationServerKey
    ) {
      swRegistration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        })
        .then(subscription => {
          subscription = subscription.toJSON();
          putSubscription({
            endpoint: subscription.endpoint,
            p256dh: subscription.keys.p256dh,
            auth: subscription.keys.auth,
          })
            .then(() => resolve())
            .catch(() => reject());
        })
        .catch(() => reject());
    } else {
      reject();
    }
  });

export const isValidPhoneNumber = (number: string): boolean => {
  const regex = /^\+((?:9[679]|8[035789]|6[789]|5[90]|42|3[578]|2[1-689])|9[0-58]|8[1246]|6[0-6]|5[1-8]|4[013-9]|3[0-469]|2[70]|7|1)(?:\W*\d){0,13}\d$/gm;
  let m;
  let r: boolean = false;

  while ((m = regex.exec(number)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    m.forEach(() => {
      r = true;
    });
  }
  return r;
};
