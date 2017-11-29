export const formatCurrency = (value = 0) =>
	'€ ' +
	parseFloat(value)
		.toFixed(2)
		.replace('.', ',');
