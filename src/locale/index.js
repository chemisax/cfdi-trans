import ja from './ja';
import es from './es';

const translator = dictionary => key => dictionary.hasOwnProperty(key) ? dictionary[key] : undefined;

// Devuelve undefined cuando no existe la traducción
export const tJa = translator(ja);
export const tEs = translator(es);
