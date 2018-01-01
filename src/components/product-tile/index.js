import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { formatCurrency } from '../../../functions/helpers';
import { buildImageUrl } from '../../utils/images';
import './style';

const Product = ({ image, price, name, id }) => (
	<Link href={'/product/' + id} class="product tile">
		<div class="product__thumb">
			<picture>
				<source
					type="image/webp"
					srcset={buildImageUrl(image, '300', 'webp')}
				/>
				<img class="product__image" src={buildImageUrl(image, '300', 'jpg')} />
			</picture>
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
