import * as enMessages from './en.json';
import { IntlLocales } from './types';

export const locales: IntlLocales = {
  // @ts-ignore
  en: ['en-US', enMessages.default, 'English', false],
  // @ts-ignore
  de: ['de-DE', null, 'Deutsch', false],
  // @ts-ignore
  ar: ['ar-SY', null, 'عربى', true],
};
export const defaultLocale: string = Object.keys(locales)[0];
