import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { formatCurrency } from '../../utils/format';

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
	state = {
		product: null
	};

	onSubmit = e => {
		e.preventDefault();
		const form = document.querySelector('.ProductForm');
		const user = Array.from(new FormData(form).entries());
		const item = {
			id: this.props.id,
			user
		};

		this.props.addBasketItem(item);
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
						<button class="Details__buy">Buy</button>
					</form>
				</div>
			);
		}
		return 'loading';
	}
}

export default connect('products', actions)(Product);
