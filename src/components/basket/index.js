import { Text } from 'preact-i18n';
import { formatCurrency, formatProduct } from '../../../functions/helpers';
import { buildImageUrl } from '../../utils/images';
import './style';

const BasketList = ({ items, total, onRemove, shiping }) => (
	<div class="BasketTable">
		{items.map((item, index) => {
			const { image, name, price, custom, type } = formatProduct(item);
			return (
				<div class="BasketTable__row">
					{image ? (
						<picture>
							<source
								type="image/webp"
								srcset={buildImageUrl(image, '300', 'webp')}
							/>
							<img
								class="BasketTable__image"
								src={buildImageUrl(image, '300', 'jpg')}
							/>
						</picture>
					) : (
						<span class="BasketTable__image" />
					)}
					<div class="BasketTable__name">
						{type ? (
							<span>
								<Text id="shipping" /> {name}
							</span>
						) : (
							<strong>{name}</strong>
						)}
						{custom.map(({ key, value }) => (
							<span class="BasketTable__extra">
								{key}:<strong>{value}</strong>
							</span>
						))}
					</div>
					<div class="BasketTable__price">{formatCurrency(price)}</div>
					<div class="BasketTable__btn">
						{!type ? (
							<button type="button" onClick={() => onRemove(index)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									width="32"
									height="32"
								>
									<path
										fill="currentColor"
										d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 464c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm94.8-285.3L281.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L256 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"
									/>
								</svg>
							</button>
						) : (
							''
						)}
					</div>
				</div>
			);
		})}
		<div class="BasketTable__row BasketTable__row--total">
			<Text id="total" />: {formatCurrency(total)}
		</div>
	</div>
);

export default BasketList;
