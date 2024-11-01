import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {dictionary} from './dictionary'

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "rulesTitle": "Rules",
                "joinButton": "Join",
                "options": "Options"
            }
        },
        es: {
            translation: {
                "rulesTitle": "Reglas",
                "joinButton": "Join",
                "options": "Opciones"
            }
        }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
        const translatedWord = dictionary[key.toLowerCase()];
        return translatedWord || key;
    }
});

export default i18n;