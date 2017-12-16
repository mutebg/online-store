import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import actions from '../../actions';

import { formatCurrency } from '../../utils/format';
import { Link } from 'preact-router/match';

export class Home extends Component {
	handleOnClick = index => {
		const $gridItem = document.querySelector(
			`.grid__item:nth-child(${index + 1})`
		);
		const $bg = $gridItem.querySelector('.product__bg');
		const $text = $gridItem.querySelector('.product__text');
		const $image = $gridItem.querySelector('.product__image');
		const $grid = document.querySelector('.grid');

		const gridRect = $grid.getBoundingClientRect();
		const imageRect = $image.getBoundingClientRect();
		const textRect = $text.getBoundingClientRect();
		const bgRect = $bg.getBoundingClientRect();
		const bodyWidth = document.body.clientWidth;
		const bodyHeight = document.body.clientHeight;

		$image.style.transform = `translateX(${gridRect.right -
			imageRect.right}px) translateY(${(imageRect.top - 60) * -1}px)`;

		const widthRatio = bodyWidth / bgRect.width;
		const heightRatio = bodyHeight / bgRect.height;

		const finaleLeftPosition = bodyWidth / 2 - bgRect.width / 2;
		const left = finaleLeftPosition - bgRect.left;

		$bg.style.transform = `
			scale( ${widthRatio}, ${heightRatio / 2})
			translate3d(
				${left / widthRatio}px, ${bgRect.top / (heightRatio / 2) * -1}px, 0)
		`;

		$text.style.transform = `
			scale(2)
			translateX(${gridRect.left - textRect.left / 2}px) translateY(-60px)
		`;
	};

	render({ products }) {
		return (
			<div class="home">
				<div class="grid">
					{products.map((product, index) => (
						<div
							class="grid__item"
							// onClick={this.handleOnClick.bind(this, index)}
						>
							<Product {...product} image={product.images[0]} />
						</div>
					))}
				</div>
			</div>
		);
	}
}

const Product = ({ image, price, name, id }) => (
	<Link class="product" href={'/product/' + id}>
		<div class="product__bg" />
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

export default connect('products', actions)(Home);
