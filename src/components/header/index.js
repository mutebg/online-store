import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { getBasketTotal } from '../../utils/cart';
import { formatCurrency } from '../../../functions/helpers';
import { Text } from 'preact-i18n';

import './style';

export class Header extends Component {
	state = {
		showBasket: false
	};

	componentDidMount() {
		this.props.loadProducts();
	}

	render({ basket }, { showBasket }) {
		const total = getBasketTotal(basket);

		return (
			<header class="header">
				<h1>
					<Link href="/">Online Store</Link>
				</h1>
				<nav>
					<Link href="/basket">
						{basket.length > 0 ? (
							<Text
								id="buy_header"
								plural={basket.length}
								fields={{
									length: basket.length,
									total: formatCurrency(total)
								}}
							/>
						) : null}
					</Link>
				</nav>
			</header>
		);
	}
}

export default connect('basket,products', actions)(Header);
