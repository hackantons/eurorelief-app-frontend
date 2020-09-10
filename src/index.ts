import './App';
import './styles.css';
import { isDev } from '@app/utils/helpers';
import './app/utils/a11y';

isDev && document.body.classList.add('dev');

if (!isDev) {
  'serviceWorker' in navigator &&
    navigator.serviceWorker.register('service-worker.js');

  // @ts-ignore
  window.installPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    // @ts-ignore
    window.installPrompt = e;
  });
}
