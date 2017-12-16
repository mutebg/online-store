const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const products = require('./products.json');

const braintree = require('braintree');
let btConfig = functions.config().bt;
if (!btConfig) {
	btConfig = require('./config.json').bt;
}
const gateway = braintree.connect({
	environment: braintree.Environment.Sandbox,
	merchantId: btConfig.merchant_id,
	publicKey: btConfig.public_key,
	privateKey: btConfig.private_key
});

const app = express();

admin.initializeApp(functions.config().firebase);

app.use(cors());
app.enable('trust proxy');

app.get('/products', (req, res) => {
	res.json(products);
});

app.get('/client_token', (req, res) => {
	gateway.clientToken.generate({}, (err, response) => {
		res.json({
			token: response.clientToken
		});
	});
});

app.post('/checkout', (req, res) => {
	// Use the payment method nonce here
	let nonceFromTheClient = req.body.paymentMethodNonce;
	let amount = req.body.amount;
	let items = req.body.items;
	let user = req.body.userData;
	// Create a new transaction for $10
	gateway.transaction.sale(
		{
			amount,
			paymentMethodNonce: nonceFromTheClient,
			options: {
				// This option requests the funds from the transaction
				// once it has been authorized successfully
				submitForSettlement: true
			}
		},
		(error, result) => {
			if (result) {
				res.send(result);
			}
			else {
				res.status(500).send(error);
			}
		}
	);
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);
