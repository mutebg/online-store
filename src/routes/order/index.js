import { h, Component } from 'preact';
import './style';
import { formatCurrency } from '../../utils/format';
import { loadOrder } from '../../utils/cart';

export class Order extends Component {
	state = {
		order: null
	};

	componentDidMount() {
		const { email, id } = this.props;
		loadOrder(id, email).then(data => {
			console.log({ data });
			this.setState({
				order: data
			});
		});
	}

	render({ id }, { order }) {
		if (order) {
			const { amount, products, user } = order;
			const productList = products.map(p => (
				<p>
					{p.name} for {formatCurrency(p.price)}
				</p>
			));
			return (
				<div>
					Hello {user.name} <br />
					Your order is <strong>{id}</strong>
					{productList}
					Total amount: {formatCurrency(amount)}
				</div>
			);
		}
		return <div>Loading...</div>;
	}
}

export default Order;
