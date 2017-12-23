import { formatCurrency } from '../../utils/format';
import { formatProduct } from '../../utils/order';
import './style';

const BasketList = ({ items, total, onRemove }) => (
	<table class="BasketTablet" border={1}>
		{items.map((item, index) => {
			const { image, name, price, custom } = formatProduct(item);
			return (
				<tr>
					<td>
						<img src={image} width={100} />
					</td>
					<td>
						{name}
						{custom.map(({ key, value }) => (
							<span>
								<br />
								{key}:{value}
							</span>
						))}
					</td>
					<td>{formatCurrency(price)}</td>
					<td>
						<button onClick={() => onRemove(index)}>remove</button>
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
