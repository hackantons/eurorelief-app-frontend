import { IntlMessages } from '@app/intl/types';

export interface State {
  intlLocale: string;
  intlMessages: IntlMessages;
  auth:
    | false
    | {
        id: string;
      };
}

export interface Actions {}
