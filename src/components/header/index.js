import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import actions from '../../actions';
import { buildBasketList } from '../../utils/cart';
import { formatCurrency } from '../../utils/format';

import './style';

export class Header extends Component {
	state = {
		showBasket: false
	};

	componentDidMount() {
		this.props.loadProducts();
	}

	render({ basket, products }, { showBasket }) {
		const { total } = buildBasketList(products, basket);

		return (
			<header class="header">
				<h1>
					<Link href="/">Online Store</Link>
				</h1>
				<nav>
					<Link href="/basket">
						{basket.length > 0
							? `Buy ${basket.length} products for ${formatCurrency(total)}`
							: ''}
					</Link>
				</nav>
			</header>
		);
	}
}

export default connect('basket,products', actions)(Header);
