import { formatCurrency } from '../../utils/format';
import './style';
const BasketList = ({ items, total, onRemove }) => (
	<table class="BasketTablet" border={1}>
		{items.map((item, index) => (
			<tr>
				<td>
					<img src={item.images[0]} width={100} />
				</td>
				<td>{item.name}</td>
				<td>{formatCurrency(item.price)}</td>
				<td>
					<button onClick={() => onRemove(index)}>remove</button>
				</td>
			</tr>
		))}
		<tr>
			<td colspan="4">Total: {formatCurrency(total)}</td>
		</tr>
	</table>
);

export default BasketList;
