import './style';
import App from './components/app';

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
		<App />
	</Provider>
);
