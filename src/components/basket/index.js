const BasketList = ({ items, total, onRemove }) => (
	<table class="Basket" border={1}>
		{items.map((item, index) => (
			<tr class="BasketItem">
				<td>
					<img src={item.images[0]} width={100} />
				</td>
				<td>{item.name}</td>
				<td>{item.price}</td>
				<td>
					<button onClick={() => onRemove(index)}>remove</button>
				</td>
			</tr>
		))}
		<tr colspan="4">
			<td>Total: {total}</td>
		</tr>
	</table>
);

export default BasketList;

