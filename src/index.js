import './style';
import App from './components/app';
import { IntlProvider } from 'preact-i18n';
import definition from './lang/bg.json';

if (!window.requestIdleCallback) {
	window.requestIdleCallback = callback => setTimeout(callback, 50);
}

import { createStore, Provider } from 'unistore/full/preact';
const initStore = { basket: [], products: [] };
const memoryStore = localStorage.getItem('store');
let store = createStore(memoryStore ? JSON.parse(memoryStore) : initStore);

store.subscribe(wholeStore => {
	requestIdleCallback(() => {
		localStorage.setItem('store', JSON.stringify(wholeStore));
	});
});

export default () => (
	<Provider store={store}>
		<IntlProvider definition={definition}>
			<App />
		</IntlProvider>
	</Provider>
);
