import bg from '../lang/bg.json';
import en from '../lang/en.json';
const langList = { en, bg };
const currentLang = langList[navigator.language.substr(0, 2)] || langList.en;

export const getDefinitions = key => {
	if (key) {
		return currentLang[key];
	}
	return currentLang;
};
