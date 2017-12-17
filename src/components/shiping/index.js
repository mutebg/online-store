import { h, Component } from 'preact';
import { loadOfficesCities, loadOfficesInCity } from '../../utils/shiping';

export default class Shiping extends Component {
	state = {
		isLoading: true,
		message: '',
		shippingMethod: 1
	};

	methods = [
		{ id: 1, name: 'Pickup office', price: 4 },
		{ id: 2, name: 'Door', price: 6 }
	];

	changeMethod = shippingMethod => {
		this.setState({ shippingMethod });
	};

	render(props, { isLoading, shippingMethod }) {
		return (
			<div class="Shiping">
				<div>
					<label>Name</label>
					<input
						name="name"
						placeholder="Full name"
						autocomplete="name"
						required
					/>
				</div>
				<div>
					<label>E-mail</label>
					<input
						name="email"
						type="email"
						placeholder="name@example.com"
						required
						autocomplete="email"
					/>
				</div>
				<div>
					<label>Phone</label>
					<input
						name="phone"
						type="tel"
						placeholder="+1-650-450-1212"
						required
						autocomplete="tel"
					/>
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

	loadOffices = e => {
		loadOfficesInCity(e.target.value).then(({ offices }) => {
			this.setState({ offices });
		});
	};

	componentDidMount() {
		loadOfficesCities().then(({ cities }) => {
			this.setState({ cities });
		});
	}

	render(props, { cities, offices }) {
		return (
			<div>
				<div>
					<label for="select_city">City</label>
					<select id="select_city" onChange={this.loadOffices}>
						<option value="">----</option>
						{cities.map(city => <option>{city}</option>)}
					</select>
				</div>
				{offices.length > 0 && (
					<div>
						<label for="select_office">Office</label>
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
					<label for="post_code">Post code:</label>
					<input
						type="text"
						name="post_code"
						required
						placeholder="1001"
						autocomplete="shipping postal-code"
					/>
				</div>
				<div>
					<label for="city">City</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="Sofia"
						autocomplete="shipping locality"
					/>
				</div>
				<div>
					<label for="street">Street:</label>
					<input
						type="text"
						id="street"
						name="street"
						autocomplete="shipping street-address"
					/>
				</div>
				<div>
					<label for="other">Other:</label>
					<input type="text" id="other" name="other" />
				</div>
			</div>
		);
	}
}
