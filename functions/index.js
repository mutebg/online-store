const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const _ = require('lodash');
const products = require('./products.json');
const emailTemplates = require('./templates/email');

///
// CONFIGURE BRAINTREE
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

////
//CONFIGURE MAILGUN
let mailGunConfig = functions.config().mailgun;
if (!mailGunConfig) {
	mailGunConfig = btConfig = require('./config.json').mailgun;
}

let mailgun = require('mailgun-js')({
	apiKey: mailGunConfig.api_key,
	domain: mailGunConfig.domain
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
				saveProduct(amount, user, items).then(() => {
					res.send({
						success: true
					});
				});
			}
			else {
				res.status(500).send(error);
			}
		}
	);
});

app.use('/econt', require('./econt'));

// Expose the API as a function
exports.api = functions.https.onRequest(app);

exports.sendEmail = functions.firestore
	.document('orders/{id}')
	.onCreate(event => {
		const orderId = event.params.id;
		const data = event.data.data();
		data.orderId = orderId;

		const sendToCustomer = sendEmail({
			from: 'gravirai.ei <me@stoyandelev.com>',
			to: data.user.email,
			subject: 'You order: ' + orderId,
			text: emailTemplates.customer(data)
		});
		const sendToAdmin = sendEmail({
			from: 'gravirai.ei <me@stoyandelev.com>',
			to: 'i@stoyandelev.com',
			subject: 'You have new order ' + orderId,
			text: emailTemplates.admin(data)
		});

		return Promise.all([sendToAdmin, sendToCustomer]);
	});

function sendEmail({ from, to, subject, text }) {
	const emailData = {
		from,
		to,
		subject,
		//text
		html: text
	};

	return new Promise((resolve, reject) => {
		mailgun.messages().send(emailData, (error, body) => {
			if (error) {
				reject(error);
			}
			else {
				resolve(body);
			}
		});
	});
}

function saveProduct(amount, user, items) {
	const flatProductList = items.map(item =>
		item.user.reduce(
			(prev, next) => {
				prev[next[0]] = next[1];
				return prev;
			},
			{
				id: item.id,
				name: item.name,
				price: item.price
			}
		)
	);

	return admin
		.firestore()
		.collection('orders')
		.add({
			amount,
			user,
			products: flatProductList
		});
}
