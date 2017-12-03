import { h, Component } from 'preact';
import { getProduct, getProductProps } from '../../utils/db';

const CustomFields = ({ number, label, length }) => {
	const list = [];
	for (let i = 1; i <= number; i++) {
		list.push(
			<div class="Custom__row">
				<label class="Custom__label">{label + ' ' + i}</label>
				<input
					name={label + i}
					class="Custom__field"
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
			<div class="Props__row">
				<lable id={id} class="Props__label">
					{label}
				</lable>
				<select name={label} class="Props__select">
					{values.map(value => <option value={value}>{value}</option>)}
				</select>
			</div>
		))}
	</div>
);

export default class Profile extends Component {
	state = {
		product: null,
		props: []
	};

	componentDidMount() {
		getProduct(this.props.id).then(product => {
			this.setState({ product });
		});
		getProductProps(this.props.id).then(props => {
			this.setState({ props });
		});
	}

	onSubmit = e => {
		e.preventDefault();
		const form = document.querySelector('.ProductForm');
		const user = Array.from(new FormData(form).entries());
		const item = {
			id: this.props.id,
			name: this.state.product.name,
			image: this.state.product.images[0],
			price: this.state.product.price,
			user
		};
	};

	render({ id }, { product, props }) {
		if (product) {
			const { name, description, price, custom, images } = product;
			return (
				<div style="margin-top: 100px">
					<div>{images.map(img => <img src={img} />)}</div>
					<h1>name: {name}</h1>
					<p>description: {description}</p>
					<p>price: {price}</p>
					<form onSubmit={this.onSubmit} class="ProductForm">
						<PropsForm data={props} />
						<CustomFields {...custom} />
						<button>Buy</button>
					</form>
				</div>
			);
		}
		return 'loading';
	}
}
