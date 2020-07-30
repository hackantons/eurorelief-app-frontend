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
  ar: ['ar', arMessages.default, 'عربى'],
};

let language = "en"

// returns shortcode like de en or ar
const browserLanguage = navigator.language.split("-")[0]
if(Object.keys(locales).includes(browserLanguage)) language = browserLanguage

export const defaultLocale: string = language;
