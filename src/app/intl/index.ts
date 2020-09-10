import * as enMessages from './en.json';
import { IntlLocales, IntlMessages } from './types';
import { getLanguageStrings } from '@app/utils/api';

export const locales: IntlLocales = {
  // @ts-ignore
  en: ['en-US', enMessages.default, 'English', false],
  // @ts-ignore
  fr: ['fr-FR', null, 'Français', false],
  // @ts-ignore
  ar: ['ar-SY', null, 'عربى', true],
  // @ts-ignore
  fa: ['fa', null, 'فارسی', true],
  // @ts-ignore
  so: ['so', null, 'Soomaali', false],
};
export const defaultLocale: string = Object.keys(locales)[0];

export const fetchMessages = (locale: string): Promise<IntlMessages> =>
  new Promise((resolve, reject) =>
    getLanguageStrings(locale)
      .then(res => resolve(res))
      .catch(e => reject(e))
  );
