import { h, Component } from 'preact';
import { loadOfficesCities, loadOfficesInCity } from '../../utils/shiping';

export default class Shiping extends Component {
	state = {
		isLoading: true,
		message: '',
		shippingMethod: 1
	};

	methods = [
		{ id: 1, name: 'Офис на Еконт' },
		{ id: 2, name: 'Доставка до врата' }
	];

	changeMethod = shippingMethod => {
		this.setState({ shippingMethod });
	};

	componentDidMount() {}

	loadOffices = city => {};

	render(props, { isLoading, shippingMethod }) {
		return (
			<div class="Shiping">
				<div>
					<label>Name</label>
					<input name="name" />
				</div>
				<div>
					<label>E-mail</label>
					<input name="email" />
				</div>
				<div>
					<label>Phone</label>
					<input name="phone" />
				</div>
				{this.methods.map(({ id, name }) => (
					<div>
						<label for={`delivery_${id}`}>{name}</label>
						<input
							checked={id === shippingMethod}
							name="delivery"
							type="radio"
							id={`delivery_${id}`}
							value={id}
							onClick={() => this.changeMethod(id)}
						/>
					</div>
				))}

				{shippingMethod === 1 ? <Office /> : <Address />}
			</div>
		);
	}
}

class Office extends Component {
	state = {
		cities: [],
		offices: []
	};

	componentDidMount() {
		loadOfficesCities().then(({ cities }) => {
			this.setState({ cities });
		});
	}

	loadOffices = e => {
		loadOfficesInCity(e.target.value).then(({ offices }) => {
			this.setState({ offices });
		});
	};

	render(props, { cities, offices }) {
		return (
			<div>
				<div>
					<label for="select_city">Град</label>
					<select id="select_city" onChange={this.loadOffices}>
						<option value="">----</option>
						{cities.map(city => <option>{city}</option>)}
					</select>
				</div>
				{offices.length > 0 && (
					<div>
						<label for="select_office">Офис</label>
						<select id="select_office" name="office_code">
							{offices.map(({ office_code, address }) => (
								<option value={office_code}>
									{office_code} {address}
								</option>
							))}
						</select>
					</div>
				)}
			</div>
		);
	}
}

class Address extends Component {
	render(props, state) {
		return (
			<div>
				<div>
					<label for="post_code">Пощенски код:</label>
					<input type="text" name="post_code" />
				</div>
				<div>
					<label for="city">Град</label>
					<input type="text" id="city" name="city" />
				</div>
				<div>
					<label for="quarter">Квартал:</label>
					<input type="text" id="quarter" name="quarter" />
				</div>
				<div>
					<label for="street">Улица:</label>
					<input type="text" id="street" name="street" />
				</div>
				<div>
					<label for="street_num">Номер:</label>
					<input type="text" id="street_num" name="street_num" />
				</div>
				<div>
					<label for="other">Друго:</label>
					<input type="text" id="other" name="other" />
				</div>
			</div>
		);
	}
}
