import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import './style';

import actions from '../../actions';

import { formatCurrency } from '../../../shared/helpers';

import { Link } from 'preact-router/match';

export class Home extends Component {
	state = {
		activeId: 0
	};

	handleOnClick = activeId => {
		this.setState({
			activeId
		});
		setTimeout(() => {
			route('product/' + activeId);
		}, 400);
	};

	render({ products }, { activeId }) {
		return (
			<div class="home">
				<div class="grid">
					{products.map((product, index) => (
						<div
							class="grid__item"
							onClick={this.handleOnClick.bind(this, product.id)}
						>
							<Product
								{...product}
								image={product.images[0]}
								isActive={product.id === activeId}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}

const Product = ({ image, price, name, id, isActive }) => {
	const bgStyle = isActive
		? {
			zIndex: 11,
			transform: `scale(10)`,
			background: '#f0f0f0',
			willChange: 'background'
		}
		: {};

	const imgStyle = isActive
		? {
			zIndex: 12,
			transform: 'translateY(-50vh)',
			opacity: 0
		}
		: {};

	return (
		<div class="product">
			<div class="product__bg" style={bgStyle} />
			<div class="product__thumb" style={imgStyle}>
				<img src={image} class="product__image" />
			</div>
			<div class="product__text">
				<h2 class="product__name">{name}</h2>
				<p class="product__price">
					<span class="visuallyhidden">Price:</span> {formatCurrency(price)}
				</p>
			</div>
			<div class="product__more">+</div>
		</div>
	);
};

export default connect('products', actions)(Home);
