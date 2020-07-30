import { IntlMessages } from '@app/intl/types';
import { Notification } from '@comp/Portal/Notifications/types';

export interface Identity {
  id: string;
  phone: string;
}

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  identity: Identity;
  notifications: Array<Notification>;
}

export interface Actions {}
