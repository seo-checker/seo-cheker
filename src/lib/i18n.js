import i18n from 'i18next'
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ['querystring', 'navigator', 'htmlTag', 'path', 'subdomain'],
        },
        backend: {
            loadPath: (document.seo ?? '') + '/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'en',
        // debug: true
    });

export default i18n;