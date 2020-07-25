import { IntlMessages } from '@app/intl/types';
import { Notification } from '@comp/Portal/Notifications/types';

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  auth:
    | false
    | {
        id: string;
      };
  notifications: Array<Notification>;
}

export interface Actions {}
