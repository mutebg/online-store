const functions = require('firebase-functions');
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

let mailGunConfig = functions.config().mailgun;
if (!mailGunConfig) {
	mailGunConfig = require('./config.json').mailgun;
}

let mailgun = require('mailgun-js')({
	apiKey: mailGunConfig.api_key,
	domain: mailGunConfig.domain
});

let globalConfig = functions.config().global;
if (!globalConfig) {
	globalConfig = require('./config.json').global;
}

exports.gateway = gateway;
exports.mailgun = mailgun;
exports.globalConfig = globalConfig;
