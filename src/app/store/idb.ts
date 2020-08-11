import { openDB, DBSchema } from 'idb';
import { Notification } from '@comp/Portal/Notifications/types';

const dbName = 'euro-relief-pwa';

interface MxDB extends DBSchema {
  settings: {
    key: string;
    value: any;
  };
  notifications: {
    key: string;
    value: Notification;
  };
}

const dbPromise = openDB<MxDB>(dbName, 2, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      db.createObjectStore('settings');
    }
    if (oldVersion < 2) {
      db.createObjectStore('notifications', {
        keyPath: 'uuid',
      });
    }
  },
});

export const settingsDB = {
  get: async (key: string) => (await dbPromise).get('settings', key),
  set: async (key: string, val: any) =>
    (await dbPromise).put('settings', val, key),
  delete: async (key: string) => (await dbPromise).delete('settings', key),
};

export const notificationsDB = {
  get: async (key: string) => (await dbPromise).get('notifications', key),
  getAll: async () => (await dbPromise).getAll('notifications'),
  set: async (object: Notification) =>
    (await dbPromise).put('notifications', object),
  delete: async (key: string) => (await dbPromise).delete('notifications', key),
};
