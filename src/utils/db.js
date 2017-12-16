export const getProducts = () =>
	fetch('/data/products.json').then(data => data.json());

export const saveOrder = (basketItems, shipping) => {
	console.log('TODO');
};
