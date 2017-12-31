import { h, Component } from 'preact';
import { Text } from 'preact-i18n';

import './style';
import { formatCurrency, formatProduct } from '../../../functions/helpers';

import { loadOrder } from '../../utils/order';
import { extractCustomer } from '../../utils/shiping';

export class Order extends Component {
	state = {
		order: null
	};

	componentDidMount() {
		const { email, id } = this.props;
		loadOrder(id, email).then(data => {
			this.setState({
				order: data
			});
		});
	}

	render({ id }, { order }) {
		if (order) {
			const { amount, products, user } = order;
			const productList = products.map(p => {
				const { price, name, custom } = formatProduct(p);
				return (
					<div class="order-view-product">
						<div class="order-view-product__main">
							<strong>{name}</strong>
							<br /> {formatCurrency(price)}
						</div>
						<div class="order-view-product__options">
							{custom.map(({ key, value }) => (
								<span>
									{key} : {value} <br />
								</span>
							))}
						</div>
					</div>
				);
			});
			return (
				<div class="order-view">
					<div class="order-view-intro">
						<p>Order number: {id}</p>
						<p>
							<Text
								id="items_for"
								plural={products.length}
								fields={{
									length: products.length,
									total: formatCurrency(amount)
								}}
							/>
						</p>
					</div>
					{productList}
					<p class="order-view-total">Total amount: {formatCurrency(amount)}</p>
					<div class="order-view-shipping">
						{extractCustomer(user).map(({ key, value }) => (
							<p>
								<Text id={key} />: {value}
							</p>
						))}
					</div>
				</div>
			);
		}
		return <div>Loading...</div>;
	}
}

export default Order;
