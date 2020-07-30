import { IntlMessages } from '@app/intl/types';
import { Message } from '@comp/Portal/Messages/types';

export interface Identity {
  id: string;
  phone: string;
}

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  identity: Identity;
  notifications: Array<Message>;
}

export interface Actions {}
