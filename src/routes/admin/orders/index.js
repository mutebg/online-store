import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import './style';
import { formatProduct } from '../../../../functions/helpers';
import reqAuth from '../reqAuth';

export class Orders extends Component {
	state = {
		orders: []
	};

	componentDidMount() {
		this.props.firebase
			.firestore()
			.collection('orders')
			.get()
			.then(querySnapshot => {
				const orders = [];
				querySnapshot.forEach(doc => {
					orders.push({
						id: doc.id,
						...doc.data()
					});
				});
				this.setState({
					orders
				});
			});
	}

	render(_, { orders }) {
		if (orders.length) {
			return (
				<table class="orders-table">
					<tr>
						<th width="200">ID</th>
						<th>Customer</th>
						<th>Products</th>
						<th width="50">Amount</th>
						<th width="50">View</th>
					</tr>
					{orders.map(order => <OrderRow key={order.id} {...order} />)}
				</table>
			);
		}
		return <div>Orders...</div>;
	}
}

export default reqAuth(Orders);

const OrderRow = ({ id, products, amount, user }) => (
	<tr>
		<td>{id}</td>
		<td>
			{extractCustomer(user).map(({ key, value }) => (
				<div>
					{key}: {value}
				</div>
			))}
		</td>
		<td>
			{products.map(p => <ProductRow key={p.id} {...formatProduct(p)} />)}
		</td>
		<td>{amount}</td>
		<td>
			<Link href={`/admin/order/${id}`}>View</Link>
		</td>
	</tr>
);

const ProductRow = ({ id, name, price, custom }) => (
	<p>
		<div>ID:{id}</div>
		<div>Name:{name}</div>
		<div>Price:{price}</div>
		{custom.map(({ key, value }) => (
			<div>
				{key} : {value}
			</div>
		))}
		<hr />
	</p>
);

const extractCustomer = customer => {
	const list = [
		'name',
		'phone',
		'email',
		'city',
		'post_code',
		'street',
		'other',
		'office_code'
	];
	return list.reduce((prev, next) => {
		if (customer[next]) {
			prev.push({
				key: next,
				value: customer[next]
			});
		}
		return prev;
	}, []);
};
