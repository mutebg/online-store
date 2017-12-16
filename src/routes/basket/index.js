import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { buildBasketList } from '../../utils/cart';
import CheckOut from '../../components/checkout';
import BasketList from '../../components/basket';

export class Basket extends Component {
	onSuccess = () => {
		console.log('is odne');
	};

	onError = () => {
		console.log('error');
	};

	render({ basket, products, removeBasketItem }) {
		const { items, total } = buildBasketList(products, basket);

		if (items.length === 0) {
			return <p>your basket is empty</p>;
		}

		return (
			<div>
				<h1>Your Cart</h1>
				<BasketList items={items} total={total} onRemove={removeBasketItem} />
				<CheckOut
					items={items}
					total={total}
					onSuccess={this.onSuccess}
					onError={this.onError}
				/>
			</div>
		);
	}
}

export default connect('basket,products', actions)(Basket);
