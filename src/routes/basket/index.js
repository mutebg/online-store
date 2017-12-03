import { h, Component } from 'preact';

export default class Home extends Component {
	state = {
		items: []
	};

	render(props, { items }) {
		return (
			<div>
				<h1>Your Cart</h1>
				<Basket items={items} />
				<CheckOut />
			</div>
		);
	}
}

const Basket = ({ items }) => (
	<table class="Basket">
		{items.map(item => (
			<tr class="BasketItem">
				<td>
					<img src={item.image} />
				</td>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>
					<button>remove</button>
				</td>
			</tr>
		))}
		<tr colspan="4">
			<td>Total: Blah</td>
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
