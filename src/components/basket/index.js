import { formatCurrency, formatProduct } from '../../../functions/helpers';
import './style';

const BasketList = ({ items, total, onRemove, shiping }) => (
	<table class="BasketTablet" border={1}>
		{items.map((item, index) => {
			const { image, name, price, custom, type } = formatProduct(item);
			return (
				<tr>
					<td>
						<img src={image} width={100} />
					</td>
					<td>
						{type ? 'Delivery:' + name : name}
						{custom.map(({ key, value }) => (
							<span>
								<br />
								{key}:{value}
							</span>
						))}
					</td>
					<td>{formatCurrency(price)}</td>
					<td>
						{!type ? (
							<button type="button" onClick={() => onRemove(index)}>
								remove
							</button>
						) : (
							''
						)}
					</td>
				</tr>
			);
		})}
		<tr>
			<td colspan="4">Total: {formatCurrency(total)}</td>
		</tr>
	</table>
);

export default BasketList;
