export const buildBasketList = (products, basketItems) => {
	const productsIds = products.reduce((prev, next) => {
		prev[next.id] = next;
		return prev;
	}, {});

	return basketItems.reduce(
		(prev, next) => {
			const item = {
				...next,
				...productsIds[next.id]
			};
			return {
				items: prev.items.concat([item]),
				total: prev.total + item.price
			};
		},
		{ items: [], total: 0 }
	);
};
