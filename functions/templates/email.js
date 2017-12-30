const { formatProduct, formatCurrency } = require('../helpers');
const noImage =
	'https://www.apccsec.org/apccsec/admin/frontpage/no-image-box.png';
const makeTdStyle = borderWidth => `style="
	border-width: ${borderWidth};
	border-color: #eee;
	border-style: solid;
	padding: 10px 0;
	vertical-align: top;
	"`;
const tdStyle = makeTdStyle('1px 0 0 0');
const tdTotalStyle = makeTdStyle('2px 0 2px 0');

const productList = (products, { currency, domain }) =>
	products
		.map(p => {
			const { price, name, custom, id } = formatProduct(p);
			return `
				<tr itemprop="acceptedOffer" itemscope itemtype="http://schema.org/Offer">
					<td valign="top" ${tdStyle}><b>${name}</b></td>
					<td valign="top" ${tdStyle}>
					${custom
		.map(
			({ key, value }) => `
							${key} : <b>${value}</b><br />`
		)
		.join('')}
				</td>
				<td valign="top" ${tdStyle}><b>${formatCurrency(price)}</b>
					<div itemprop="itemOffered" itemscope itemtype="http://schema.org/Product">
						<meta itemprop="name" content="${name}"/>
						<meta itemprop="sku" content="${id}"/>
						<meta itemprop="image" content="${noImage}"/>
						<meta itemprop="url" content="${domain}product/${id}"/>
					</div>
					<meta itemprop="price" content="${price}"/>
					<meta itemprop="priceCurrency" content="${currency}"/>
					<div itemprop="eligibleQuantity" itemscope itemtype="http://schema.org/QuantitativeValue">
						<meta itemprop="value" content="1"/>
					</div>
				</td>
			  </tr>
				`;
		})
		.join('');

exports.customer = function(
	{ user, orderId, products, amount },
	{ domain, name, currency = 'lv' }
) {
	const orderLink = domain + 'order/' + orderId + '/' + user.email;
	return `
	<html>
	  <body>
		<div itemscope itemtype="http://schema.org/Order" style="padding: 2em">
			<div itemprop="merchant" itemscope itemtype="http://schema.org/Organization">
				<meta itemprop="name" content="${name}"/>
			</div>
			<meta itemprop="orderNumber" content="${orderId}"/>
			<meta itemprop="priceCurrency" content="${currency}"/>
			<meta itemprop="price" content="${amount}"/>


		Hello <b>${user.name}</b><br />
    Your order id is <b>${orderId}</b><br />
		<a href="${orderLink}">View your order</a><br >

		<table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 2em">
			${productList(products, { currency, domain })}
			<tr>
				<td valign="top" ${tdTotalStyle}><h3>Total amount</h3></td>
				<td valign="top" ${tdTotalStyle}></td>
				<td valign="top" ${tdTotalStyle}><h3>${formatCurrency(amount)}</h3></td>
			</tr>
		</table>



			<link itemprop="url" href="${orderLink}"/>
			<div itemprop="potentialAction" itemscope itemtype="http://schema.org/ViewAction">
				<link itemprop="url" href="${orderLink}"/>
			</div>
			<link itemprop="orderStatus" href="http://schema.org/OrderProcessing"/>
			<div itemprop="priceSpecification" itemscope itemtype="http://schema.org/PriceSpecification">
		    <meta itemprop="price" content="${amount}"/>
		  </div>
		</div>
	</body>
</html>
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
