import { Text } from 'preact-i18n';
import { formatCurrency, formatProduct } from '../../../functions/helpers';
import './style';

const BasketList = ({ items, total, onRemove, shiping }) => (
	<div class="BasketTable">
		{items.map((item, index) => {
			const { image, name, price, custom, type } = formatProduct(item);
			return (
				<div class="BasketTable__row">
					{image ? (
						<img src={image} class="BasketTable__image" />
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
								<Text id="remove" />
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
