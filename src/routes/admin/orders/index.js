import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import './style';
import { get } from '../../../utils/api';
import { formatProduct } from '../../../utils/order';

export class Orders extends Component {
	state = {
		orders: []
	};

	componentDidMount() {
		get('/orders')
			.then(({ orders }) => {
				this.setState({ orders });
			})
			.catch(error => {
				// TOOD
			});
	}

	render(_, { orders }) {
		if (orders.length) {
			return (
				<table class="orders-table">
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Products</th>
						<th>Shiping</th>
						<th>Amount</th>
						<th>View</th>
					</tr>
					{orders.map(order => <OrderRow key={order.id} {...order} />)}
				</table>
			);
		}
		return <div>Orders...</div>;
	}
}

export default Orders;

const OrderRow = ({ id, products, amount, user }) => (
	<tr>
		<td>{id}</td>
		<td>{user.name}</td>
		<td>{user.email}</td>
		<td>
			{products.map(p => <ProductRow key={p.id} {...formatProduct(p)} />)}
		</td>
		<td>___</td>
		<td>{amount}</td>
		<td>
			<Link href={`/admin/order/${id}`}>View</Link>
		</td>
	</tr>
);

const ProductRow = ({ id, name, price, custom }) => (
	<p>
		ID:{id}
		<br />
		Name:{name}
		<br />
		Price:{price}
		{custom.map(({ key, value }) => (
			<span>
				<br />
				{key} : {value}
			</span>
		))}
		<hr />
	</p>
);
