import { IntlMessages } from '@app/intl/types';
import { Message } from '@comp/Portal/Messages/types';

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
    data: Array<Message>;
    error: string;
  };
}

export interface Actions {}
