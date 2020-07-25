import * as enMessages from './en.json';
import * as deMessages from './de.json';
import { IntlLocales } from './types';

export const locales: IntlLocales = {
  // @ts-ignore
  en: ['en-US', enMessages.default, 'English'],
  // @ts-ignore
  de: ['de-DE', deMessages.default, 'Deutsch'],
};
export const defaultLocale: string = Object.keys(locales)[0];
