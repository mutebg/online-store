const _ = require('lodash');
const mapProducts = products =>
	products.map(({ id, name, price }) => {
		const options = _.map({}, (val, key) => `${key} : ${val}`);
		return `<p>${name}  ${options ? options : ''} - ${price}</p>`;
	});

exports.customer = function({ user, orderId, products, amount }) {
	return `
    Hello ${user.name} <br />
    Your order id is <b>${orderId}</b><br />

    Products you ordered:<br />
    ${mapProducts(products)}
    Total amount: ${amount}
  `;
};

exports.admin = function({ user, orderId, products, amount }) {
	return `
    You have a new order:<br />
		amount: ${amount}<br />
		id: ${orderId}<br />

  `;
};
