import * as enMessages from './en.json';
import * as deMessages from './de.json';
import * as frMessages from './fr.json';
import * as faMessages from './fa.json';
import * as somMessages from './som.json';
import * as arMessages from './ar.json';
import { IntlLocales } from './types';

export const locales: IntlLocales = {
  // @ts-ignore
  en: ['en-US', enMessages.default, 'English'],
  // @ts-ignore
  fr: ['fr', frMessages.default, 'French'],
  // @ts-ignore
  de: ['de-DE', deMessages.default, 'Deutsch'],
  // @ts-ignore
  fa: ['fa', faMessages.default, 'Farsi'],
  // @ts-ignore
  som: ['som', somMessages.default, 'Somali'],
  // @ts-ignore
  fa: ['ar', arMessages.default, 'عربى'],
};
export const defaultLocale: string = Object.keys(locales)[0];
