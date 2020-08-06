import * as enMessages from './en.json';
import { IntlLocales, IntlMessages } from './types';
import { getLanguageStrings } from '@app/vendor/api';

export const locales: IntlLocales = {
  // @ts-ignore
  en: ['en-US', enMessages.default, 'English', false],
  // @ts-ignore
  fr: ['fr-FR', null, 'Français', false],
  // @ts-ignore
  ar: ['ar-SY', null, 'عربى', true],
};
export const defaultLocale: string = Object.keys(locales)[0];

export const fetchMessages = (locale: string): Promise<IntlMessages> =>
  new Promise((resolve, reject) =>
    getLanguageStrings(locale)
      .then(res => resolve(res.data))
      .catch(e => reject(e))
  );
