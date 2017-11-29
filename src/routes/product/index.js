import { h, Component } from 'preact';
import { getProduct } from '../../utils/db';

const CustomFields = ({ number, label, length }) => {
	const list = [];
	console.log({ length });
	for (let i = 1; i <= number; i++) {
		list.push(
			<div>
				<label>{label + ' ' + i}</label>
				<input type="text" maxLength={length} />
			</div>
		);
	}
	return <div>{list}</div>;
};

export default class Profile extends Component {
	state = {};

	// gets called when this route is navigated to
	componentDidMount() {
		getProduct(this.props.id).then(product => {
			this.setState({ product });
		});
	}

	render({ id }, { product }) {
		if (product) {
			const { name, description, price, custom } = product;
			return (
				<div style="margin-top: 100px">
					<h1>name: {name}</h1>
					<p>description: {description}</p>
					<p>price: {price}</p>
					<CustomFields number={2} {...custom} />
				</div>
			);
		}
		return 'loading';
	}
}
