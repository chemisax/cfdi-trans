import ja from './ja';

const locale = 'ja';

let locales = {
    ja
}

export default function translate (string) {
    if (!locales.hasOwnProperty(locale)) {
        return string;
    }
    if (!locales[locale].hasOwnProperty(string)) {
        return string;
    }
    return locales[locale][string];
}
