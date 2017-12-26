import './style';
import App from './components/app';
import { IntlProvider } from 'preact-i18n';
import { createStore, Provider } from 'unistore/full/preact';

// language detection
import bg from './lang/bg.json';
import en from './lang/en.json';
const langList = { en, bg };
const currentLang = langList[navigator.language.substr(0, 2)] || langList.en;

// init store
const initStore = { basket: [], products: [] };
const memoryStore = localStorage.getItem('store');
let store = createStore(memoryStore ? JSON.parse(memoryStore) : initStore);
//polifill  requestIdleCallback
if (!window.requestIdleCallback) {
	window.requestIdleCallback = callback => setTimeout(callback, 50);
}
// save the store in localstorage
store.subscribe(wholeStore => {
	requestIdleCallback(() => {
		localStorage.setItem('store', JSON.stringify(wholeStore));
	});
});

export default () => (
	<Provider store={store}>
		<IntlProvider definition={currentLang}>
			<App />
		</IntlProvider>
	</Provider>
);
