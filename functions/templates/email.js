const { formatProduct, formatCurrency } = require('../helpers');

const productList = (products, { currency }) =>
	products
		.map(p => {
			const { price, name, custom } = formatProduct(p);
			return `<div itemprop="acceptedOffer" itemscope itemtype="http://schema.org/Offer">
			${name}: ${formatCurrency(price)}
			<br />
			${custom
		.map(
			({ key, value }) => `
					${key} : ${value} <br />`
		)
		.join('')}

			    <div itemprop="itemOffered" itemscope itemtype="http://schema.org/Product">
			      <meta itemprop="name" content="${name}"/>
			    </div>
			    <meta itemprop="price" content="${price}"/>
			    <meta itemprop="priceCurrency" content="${currency}"/>
			    <div itemprop="eligibleQuantity" itemscope itemtype="http://schema.org/QuantitativeValue">
			      <meta itemprop="value" content="1"/>
			    </div>
					<hr />
			  </div>
				`;
		})
		.join('');

exports.customer = function(
	{ user, orderId, products, amount },
	{ domain, name, currency = 'lv' }
) {
	const orderLink = domain + 'order/' + orderId + '/' + user.email;
	return `
		<div itemscope itemtype="http://schema.org/Order">
			<div itemprop="merchant" itemscope itemtype="http://schema.org/Organization">
				<meta itemprop="name" content="${name}"/>
			</div>
			<meta itemprop="orderNumber" content="${orderId}"/>
			<meta itemprop="priceCurrency" content="${currency}"/>
			<meta itemprop="price" content="${amount}"/>


		Hello ${user.name} <br />
    Your order id is <b>${orderId}</b><br />
		<a href="${orderLink}">View to your order</a><br >

    Products you ordered:<br />
    ${productList(products, { currency })}
    Total amount: ${amount}

			<link itemprop="url" href="${orderLink}"/>
			<div itemprop="potentialAction" itemscope itemtype="http://schema.org/ViewAction">
				<link itemprop="url" href="${orderLink}"/>
			</div>

		</div>
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
