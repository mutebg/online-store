import { h, Component } from 'preact';
import './style';
import { formatCurrency, formatProduct } from '../../../shared/helpers';

import { loadOrder } from '../../utils/order';

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
					<p class="order-product-box">
						{name} for {formatCurrency(price)}
						<br />
						{custom.map(({ key, value }) => (
							<span>
								{key} : {value} <br />
							</span>
						))}
					</p>
				);
			});
			return (
				<div>
					Hello {user.name} <br />
					Your order is <strong>{id}</strong>
					{productList}
					<p class="order-total">Total amount: {formatCurrency(amount)}</p>
				</div>
			);
		}
		return <div>Loading...</div>;
	}
}

export default Order;
