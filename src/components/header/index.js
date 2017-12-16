import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import actions from '../../actions';

import style from './style';

export class Header extends Component {
	state = {
		showBasket: false
	};

	componentDidMount() {
		this.props.loadProducts();
	}

	render({ basket }, { showBasket }) {
		return (
			<header class={style.header}>
				<h1>Online Store</h1>
				<nav>
					<Link activeClassName={style.active} href="/basket">
						Basket {basket.length > 0 ? `(${basket.length})` : ''}
					</Link>
				</nav>
			</header>
		);
	}
}

export default connect('basket', actions)(Header);
