import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { buildBasketList } from '../../utils/cart';
import CheckOut from '../../components/checkout';
import Shiping from '../../components/shiping';

import BasketList from '../../components/basket';
import './style';

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
			<form class="BasketPage" id="bakset-form">
				<h1>Your Cart</h1>
				<div class="BasketPage__box">
					<BasketList items={items} total={total} onRemove={removeBasketItem} />
				</div>
				<h1>Shipping</h1>
				<div class="BasketPage__box">
					<Shiping />
				</div>
				<h1>Payment</h1>
				<div class="BasketPage__box">
					<CheckOut
						items={items}
						total={total}
						onSuccess={this.onSuccess}
						onError={this.onError}
					/>
				</div>
			</form>
		);
	}
}

export default connect('basket,products', actions)(Basket);
