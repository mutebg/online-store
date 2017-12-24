import { get } from './api';

export const loadOrder = (id, email) =>
	get('/orders/' + id + '?email=' + email);
