import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import './style';
import actions from '../../actions';
import { formatCurrency } from '../../../functions/helpers';
import CustomFields from './CustomFields';
import PropsForm from './PropsForm';
import { Text } from 'preact-i18n';

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
		route('/basket/');
	};

	render({ products, id }) {
		const product = products.filter(p => p.id === id)[0];

		if (product) {
			const { name, description, price, custom, images, props } = product;
			return (
				<div class="Details">
					<h1 class="Details__name showIn">{name}</h1>
					<p class="Details__price showIn">{formatCurrency(price)}</p>
					<p class="Details__description showIn">{description}</p>

					<form onSubmit={this.onSubmit} class="DetailsForm tile showIn">
						<PropsForm data={props} />
						<CustomFields {...custom} />
						<button class="btn Details__buy">
							<Text id="buy" />
						</button>
					</form>

					{images.map(img => (
						<img src={img} class="Details__image tile showIn" />
					))}
				</div>
			);
		}
		return 'loading';
	}
}

export default connect('products', actions)(Product);
