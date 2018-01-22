import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { route } from 'preact-router';
import './style';
import actions from '../../actions';
import { formatCurrency } from '../../../functions/helpers';
import { buildImageUrl } from '../../utils/images';
import { getFormData } from '../../utils/dom';
import CustomFields from './CustomFields';
import PropsForm from './PropsForm';
import { Text } from 'preact-i18n';

export class Product extends Component {
	onSubmit = e => {
		e.preventDefault();
		const form = document.querySelector('.DetailsForm');
		const user = getFormData(form);
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
					<div class="Details__main">
						<h1 class="Details__name">{name}</h1>
						<p class="Details__price">{formatCurrency(price)}</p>
						<p class="Details__description">{description}</p>

						<form onSubmit={this.onSubmit} class="DetailsForm">
							<PropsForm data={props} />
							<CustomFields {...custom} />
							<button class="btn Details__buy">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="btn__icon"
									viewBox="0 0 576 512"
								>
									<path
										fill="currentColor"
										d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM464 416c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32zm-256 0c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32zm294.156-128H171.28l-36-192h406.876l-40 192zM272 196v-8c0-6.627 5.373-12 12-12h36v-36c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12v36h36c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-36v36c0 6.627-5.373 12-12 12h-8c-6.627 0-12-5.373-12-12v-36h-36c-6.627 0-12-5.373-12-12z"
									/>
								</svg>
								<Text id="buy" />
							</button>
						</form>
					</div>

					<div class="Details__images">
						{images.map(img => (
							<picture>
								<source
									type="image/webp"
									media="(min-width: 1600px)"
									srcset={buildImageUrl(img, '1200', 'webp')}
								/>
								<source
									type="image/jpg"
									media="(min-width: 1600px)"
									srcset={buildImageUrl(img, '1200', 'jpg')}
								/>
								<source
									type="image/webp"
									media="(min-width: 1200px)"
									srcset={buildImageUrl(img, '900', 'webp')}
								/>
								<source
									type="image/jpg"
									media="(min-width: 1200px)"
									srcset={buildImageUrl(img, '900', 'jpg')}
								/>
								<source
									type="image/webp"
									media="(min-width: 900px)"
									srcset={buildImageUrl(img, '600', 'webp')}
								/>
								<source
									type="image/jpg"
									media="(min-width: 900px)"
									srcset={buildImageUrl(img, '600', 'jpg')}
								/>
								<source
									type="image/webp"
									srcset={buildImageUrl(img, '300', 'webp')}
								/>
								<img
									class="Details__image"
									src={buildImageUrl(img, '300', 'jpg')}
								/>
							</picture>
						))}
					</div>
				</div>
			);
		}
		return 'loading';
	}
}

export default connect('products', actions)(Product);
