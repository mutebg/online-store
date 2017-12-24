import { getProducts } from './utils/db';

let actions = store => ({
	addBasketItem: (state, basketItem) => ({
		basket: [...state.basket, basketItem]
	}),
	removeBasketItem: (state, basketIndex) => ({
		basket: state.basket.filter((_, index) => index !== basketIndex)
	}),
	loadProducts(state) {
		getProducts().then(products => {
			store.setState({ products });
		});
	},
	clearBasket: state => ({
		basket: []
	})
});

export default actions;
