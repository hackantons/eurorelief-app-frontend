import { IntlMessages } from '@app/intl/types';
import { Notification } from '@comp/Portal/Notifications/types';

export interface AuthObject {
  id: string;
}

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  auth: false | AuthObject;
  notifications: Array<Notification>;
}

export interface Actions {}
