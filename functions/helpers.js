//
// !!!!!!!!!!!!!!!!!!!!!!!!
// IMPORTANT
// !!!!!!!!!!!!!!!!!!!!!!!!
// THIS FILE IS SHARED WITH FRONTEND
//
exports.formatProduct = product => {
	const fields = ['id', 'name', 'price', 'image', 'type'];
	const formatedProduct = { custom: [], id: 0, price: 0, name: '', image: '' };
	for (const key of Object.keys(product)) {
		const value = product[key];
		if (fields.indexOf(key) >= 0) {
			formatedProduct[key] = value;
		}
		else {
			formatedProduct.custom.push({ key, value });
		}
	}
	return formatedProduct;
};

exports.formatCurrency = (value = 0) =>
	'€ ' +
	parseFloat(value)
		.toFixed(2)
		.replace('.', ',');
