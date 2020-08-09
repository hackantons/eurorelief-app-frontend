import { putSubscription } from '@app/vendor/api';

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
