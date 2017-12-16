import { get } from './api';

export const getProducts = () => get('products');

export const saveOrder = (basketItems, shipping) => {
	console.log('TODO');
};
