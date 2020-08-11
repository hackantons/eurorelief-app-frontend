import { IntlMessages } from '@app/intl/types';
import { Notification } from '@comp/Portal/Notifications/types';

export interface Identity {
  id: string;
  phone: string;
}

export interface State {
  intl: {
    locale: string;
    messages: IntlMessages;
    loading: string;
  };
  identity: Identity;
  notifications: {
    state: string;
    data: Array<Notification>;
    error: string;
  };
  offline: boolean;
}

export interface Actions {}
