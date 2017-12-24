import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { formatCurrency } from '../../../functions/helpers';
import './style';

const Product = ({ image, price, name, id }) => (
	<Link href={'/product/' + id} class="product tile">
		<div class="product__thumb">
			<img src={image} class="product__image" />
		</div>
		<div class="product__text">
			<h2 class="product__name">{name}</h2>
			<p class="product__price">
				<span class="visuallyhidden">Price:</span> {formatCurrency(price)}
			</p>
		</div>
		<div class="product__more">+</div>
	</Link>
);

export default Product;
