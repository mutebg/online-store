const { formatProduct, formatCurrency } = require('../helpers');

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

exports.customer = function({ user, orderId, products, amount }, { domain }) {
	return `
    Hello ${user.name} <br />
    Your order id is <b>${orderId}</b><br />
		<a href="${domain}order/${orderId}/${user.email}">View to your order</a>

    Products you ordered:<br />
    ${productList(products)}
    Total amount: ${amount}
  `;
};

exports.admin = function({ user, orderId, products, amount }, { domain }) {
	return `
    You have a new order:<br />
		amount: ${amount}<br />
		id: ${orderId}<br />
		<a href="${domain}admin/order/${orderId}">View order</a>


  `;
};
