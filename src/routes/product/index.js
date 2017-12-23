import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import './style';
import actions from '../../actions';
import { formatCurrency } from '../../utils/format';
import { route } from 'preact-router';

const CustomFields = ({ number, label, length }) => {
	const list = [];
	for (let i = 1; i <= number; i++) {
		list.push(
			<div class="form-row">
				<label class="form-row__label">{label + ' ' + i}</label>
				<input
					name={label + i}
					class="form-row__field"
					type="text"
					maxLength={length}
					required
				/>
			</div>
		);
	}
	return <div class="Custom">{list}</div>;
};

const PropsForm = ({ data }) => (
	<div class="Props">
		{data.map(({ id, label, values }) => (
			<div class="form-row">
				<lable id={id} class="form-row__label">
					{label}
				</lable>
				<select name={label} class="form-row__field">
					{values.map(value => <option value={value}>{value}</option>)}
				</select>
			</div>
		))}
	</div>
);

export class Product extends Component {
	onSubmit = e => {
		e.preventDefault();
		const form = document.querySelector('.DetailsForm');
		const user = Array.from(new FormData(form).entries());
		const product = this.props.products.filter(p => p.id === this.props.id)[0];

		const item = {
			id: this.props.id,
			name: product.name,
			price: product.price,
			image: product.images[0]
		};

		user.forEach(v => {
			item[v[0]] = v[1];
		});
		this.props.addBasketItem(item);
		route('basket/');
	};

	render({ products, id }) {
		const product = products.filter(p => p.id === id)[0];

		if (product) {
			const { name, description, price, custom, images, props } = product;
			return (
				<div class="Details">
					{images.map(img => <img src={img} class="Details__image showIn" />)}
					<h1 class="Details__name showIn">{name}</h1>
					<p class="Details__price showIn">{formatCurrency(price)}</p>
					<p class="Details__description showIn">{description}</p>

					<form onSubmit={this.onSubmit} class="DetailsForm showIn">
						<PropsForm data={props} />
						<CustomFields {...custom} />
						<button class="btn Details__buy">Buy</button>
					</form>
				</div>
			);
		}
		return 'loading';
	}
}

export default connect('products', actions)(Product);
