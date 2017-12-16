export const getProducts = () =>
	fetch('/data/products.json').then(data => data.json());
