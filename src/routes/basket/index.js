import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { buildBasketList } from '../../utils/cart';

export class Basket extends Component {
	render({ basket, products, removeBasketItem }) {
		const { items, total } = buildBasketList(products, basket);

		if (items.length === 0) {
			return <p>your basket is empty</p>;
		}

		return (
			<div>
				<h1>Your Cart</h1>
				<BasketList items={items} total={total} onRemove={removeBasketItem} />
				<CheckOut />
			</div>
		);
	}
}

const BasketList = ({ items, total, onRemove }) => (
	<table class="Basket" border={1}>
		{items.map((item, index) => (
			<tr class="BasketItem">
				<td>
					<img src={item.images[0]} width={100} />
				</td>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>
					<button onClick={() => onRemove(index)}>remove</button>
				</td>
			</tr>
		))}
		<tr colspan="4">
			<td>Total: {total}</td>
		</tr>
	</table>
);

const CheckOut = () => (
	<div class="CheckOut">
		<div>
			<label>Name</label>
			<input name="name" />
		</div>
		<div>
			<label>E-mail</label>
			<input name="email" />
		</div>
		<label for="delivery_1">Офис на Еконт</label>
		<input name="delivery" type="radio" id="delivery_1" value="1" />
		<label for="delivery_2">Доставка до врата</label>
		<input name="delivery" type="radio" id="delivery_2" value="2" />
	</div>
);

export default connect('basket,products', actions)(Basket);
