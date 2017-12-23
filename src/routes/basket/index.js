import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { getBasketTotal } from '../../utils/cart';
import CheckOut from '../../components/checkout';
import Shiping from '../../components/shiping';
import { route } from 'preact-router';

import BasketList from '../../components/basket';
import './style';

export class Basket extends Component {
	state = {
		shippingMethod: 1
	};

	shippingMethods = [
		{ id: 1, name: 'Pickup office', price: 4, type: 'office' },
		{ id: 2, name: 'Door', price: 6, type: 'address' }
	];

	onShippingChange = id => {
		this.setState({
			shippingMethod: id
		});
	};

	onSuccess = ({ id, user }) => {
		route('order/' + id + '/' + user.email + '?status=new_order');
	};

	onError = () => {};

	render({ basket, products, removeBasketItem }, { shippingMethod }) {
		const currentShipping = this.shippingMethods.filter(
			({ id }) => id === shippingMethod
		);
		const total = getBasketTotal(basket.concat(currentShipping));

		if (basket.length === 0) {
			return <p>your basket is empty</p>;
		}

		return (
			<form class="BasketPage" id="bakset-form">
				<h1>Your Cart</h1>
				<div class="BasketPage__box">
					<BasketList
						items={[].concat(basket, currentShipping)}
						total={total}
						onRemove={removeBasketItem}
					/>
				</div>
				<h1>Shipping</h1>
				<div class="BasketPage__box">
					<Shiping
						methods={this.shippingMethods}
						selected={shippingMethod}
						onChange={this.onShippingChange}
					/>
				</div>
				<h1>Payment</h1>
				<div class="BasketPage__box">
					<CheckOut
						items={[].concat(basket, currentShipping)}
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
