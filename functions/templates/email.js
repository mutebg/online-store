const { formatProduct, formatCurrency } = require('../../shared/helpers');

const productList = products =>
	products
		.map(p => {
			const { price, name, custom } = formatProduct(p);
			return `<p>
				${name} for ${formatCurrency(price)}
				<br />
				${custom
		.map(
			({ key, value }) => `
						${key} : ${value} <br />`
		)
		.join('')}
			</p>`;
		})
		.join('');

exports.customer = function({ user, orderId, products, amount }) {
	return `
    Hello ${user.name} <br />
    Your order id is <b>${orderId}</b><br />

    Products you ordered:<br />
    ${productList(products)}
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
