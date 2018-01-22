import bg from '../lang/bg.json';
//import en from '../lang/en.json';
const langList = { bg };
const currentLang = langList[navigator.language.substr(0, 2)] || langList.bg;

export const getDefinitions = key => {
	if (key) {
		return currentLang[key];
	}
	return currentLang;
};
