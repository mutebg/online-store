import { get } from './api';
export const loadOfficesCities = () => get('econt/offices');
export const loadOfficesInCity = city => get('econt/offices/' + city);

export const extractCustomer = customer => {
	const list = [
		'name',
		'phone',
		'email',
		'city',
		'post_code',
		'street',
		'other',
		'office_code'
	];
	return list.reduce((prev, next) => {
		if (customer[next]) {
			prev.push({
				key: next,
				value: customer[next]
			});
		}
		return prev;
	}, []);
};
