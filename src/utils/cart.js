import { get, post } from './api';

export const buildBasketList = (products, basketItems) => {
	const productsIds = products.reduce((prev, next) => {
		prev[next.id] = next;
		return prev;
	}, {});

	return basketItems.reduce(
		(prev, next) => {
			const item = {
				...next,
				...productsIds[next.id]
			};
			return {
				items: prev.items.concat([item]),
				total: prev.total + item.price
			};
		},
		{ items: [], total: 0 }
	);
};

export const getToken = () => get('client_token');

export const makeTransaction = (paymentMethodNonce, amount, items, userData) =>
	post('checkout', {
		paymentMethodNonce,
		items,
		amount,
		userData
	});

export const loadOrder = (id, email) => get('/order/' + id + '?email=' + email);
