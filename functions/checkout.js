const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const productsData = require('./products.json');
const ORDER_STATUS = require('./consts.js').ORDER_STATUS;

router.get('/client_token', (req, res) => {
	const { gateway } = require('./inits');
	return new Promise((resolve, reject) => {
		gateway.clientToken.generate({}, (err, response) => {
			if (err) {
				reject(err);
			} else {
				resolve(response);
			}
		});
	}).then(response =>
		res.json({
			token: response.clientToken
		})
	);
});

router.post('/checkout', (req, res) => {
	const { gateway } = require('./inits');
	// Use the payment method nonce here
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amount = req.body.amount;
	let items = req.body.items;
	let user = req.body.userData;
	return new Promise((resolve, reject) => {
		gateway.transaction.sale(
			{
				amount,
				paymentMethodNonce: nonceFromTheClient,
				options: {
					submitForSettlement: true
				}
			},
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			}
		);
	})
		.then(result => {
			const checkProducts = items.every(p => validateProduct(productsData, p));
			if (!checkProducts) {
				return res.status(500).send('Fake order data...');
			}

			saveProduct(amount, user, items).then(ref => {
				res.send({
					success: true,
					order: {
						amount,
						user,
						products: items,
						id: ref.id
					}
				});
			});
		})
		.catch(error => {
			res.status(500).send(error);
		});
});

function saveProduct(amount, user, products) {
	return admin
		.firestore()
		.collection('orders')
		.add({
			date: new Date(),
			status: ORDER_STATUS[0],
			amount,
			user,
			products
		});
}

module.exports = router;

const validateProduct = (dbProducts, product) => {
	// it is delivery
	if (product.type) {
		return true;
	}

	const selectedProduct = dbProducts.filter(({ id }) => id === product.id);
	if (selectedProduct.length !== 1) {
		console.log("product doesn't exists", product);
		return false; // product doesn't exists
	}

	const dbProduct = selectedProduct[0];

	// validate price
	if (dbProduct.price !== product.price) {
		console.log(
			'price of product is different',
			product.price,
			dbProduct.price
		);
		return false; // price of product is different
	}

	//validate custom data
	if (dbProduct.custom) {
		for (let i = 1; i <= dbProduct.custom.number; i++) {
			const customValue = product[dbProduct.custom.label + i];
			if (!customValue || customValue.length > dbProduct.custom.length) {
				console.log('invalida custom value', product, customValue);
				return false; // invalida custom value
			}
		}
	}

	//validate props
	if (dbProduct.props.length > 0) {
		dbProduct.props.forEach(({ label, values }) => {
			const productPropValue = product[label];
			if (values.indexOf(productPropValue) === -1) {
				console.log('invalida property value', product, productPropValue);
				return false; // invalid property value
			}
		});
	}

	return true;
};
