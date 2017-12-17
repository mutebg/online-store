import { get } from './api';
export const loadOfficesCities = () => get('econt/offices');
export const loadOfficesInCity = city => get('econt/offices/' + city);

