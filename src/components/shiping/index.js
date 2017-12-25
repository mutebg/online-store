import { h, Component } from 'preact';
import { Text, Localizer } from 'preact-i18n';
import { loadOfficesCities, loadOfficesInCity } from '../../utils/shiping';
import { formatCurrency } from '../../../functions/helpers';

import './style.scss';

export default class Shiping extends Component {
	state = {
		message: '',
		shippingMethod: 1
	};

	changeMethod = shippingMethod => {
		this.props.onChange(shippingMethod);
	};

	render({ selected, methods }) {
		const MethodForm = methods.reduce((prev, next) => {
			if (next.id === selected) {
				switch (next.type) {
					case 'address':
						return <Address />;
					case 'office':
						return <Office />;
				}
			}
			return prev;
		}, <Address />);

		return (
			<div class="Shiping">
				<div class="form-row">
					<label class="form-row__label">
						<Text id="name" />
					</label>
					<Localizer>
						<input
							class="form-row__field"
							name="name"
							placeholder={<Text id="name_placeholder" />}
							autocomplete="name"
							required
						/>
					</Localizer>
				</div>
				<div class="form-row">
					<label class="form-row__label">
						<Text id="email" />
					</label>
					<Localizer>
						<input
							class="form-row__field"
							name="email"
							type="email"
							placeholder={<Text id="email_placeholder" />}
							required
							autocomplete="email"
						/>
					</Localizer>
				</div>
				<div class="form-row">
					<label class="form-row__label">
						<Text id="phone" />
					</label>
					<Localizer>
						<input
							class="form-row__field"
							name="phone"
							type="tel"
							placeholder={<Text id="phone_placeholder" />}
							required
							autocomplete="tel"
						/>
					</Localizer>
				</div>
				<div class="shipping-tabs">
					{methods.map(({ id, name, price }) => [
						<label
							for={`delivery_${id}`}
							class={
								'shipping-tabs__item ' +
								(id === selected ? 'shipping-tabs__item--selected' : '')
							}
						>
							{name}: {formatCurrency(price)}
						</label>,
						<input
							checked={id === selected}
							name="delivery"
							type="radio"
							id={`delivery_${id}`}
							value={id}
							onClick={() => this.changeMethod(id)}
						/>
					])}
				</div>

				{MethodForm}
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
				<div class="form-row">
					<label class="form-row__label" for="select_city">
						<Text id="city" />
					</label>
					<select
						id="select_city"
						onChange={this.loadOffices}
						required
						class="form-row__field"
					>
						<option value="">----</option>
						{cities.map(city => <option>{city}</option>)}
					</select>
				</div>
				{offices.length > 0 && (
					<div class="form-row">
						<label class="form-row__label" for="select_office">
							<Text id="office" />
						</label>
						<select
							required
							id="select_office"
							name="office_code"
							class="form-row__field"
						>
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
				<div class="form-row">
					<label class="form-row__label" for="post_code">
						<Text id="post_code" />
					</label>
					<Localizer>
						<input
							class="form-row__field"
							type="text"
							name="post_code"
							required
							placeholder={<Text id="post_code_placeholder" />}
							autocomplete="shipping postal-code"
						/>
					</Localizer>
				</div>
				<div class="form-row">
					<label class="form-row__label" for="city">
						<Text id="city" />
					</label>
					<Localizer>
						<input
							class="form-row__field"
							type="text"
							id="city"
							name="city"
							placeholder={<Text id="city_placeholder" />}
							required
							autocomplete="shipping locality"
						/>
					</Localizer>
				</div>
				<div class="form-row">
					<label class="form-row__label" for="street">
						<Text id="street" />
					</label>
					<Localizer>
						<input
							class="form-row__field"
							type="text"
							id="street"
							name="street"
							required
							placeholder={<Text id="street_placeholder" />}
							autocomplete="shipping street-address"
						/>
					</Localizer>
				</div>
				<div class="form-row">
					<label class="form-row__label" for="other">
						<Text id="other" />
					</label>
					<input type="text" id="other" name="other" class="form-row__field" />
				</div>
			</div>
		);
	}
}
