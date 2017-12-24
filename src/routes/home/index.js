import { h, Component } from 'preact';
import { connect } from 'unistore/preact';

import actions from '../../actions';
import Product from '../../components/product-tile';

const Home = ({ products }) => (
	<div class="home">
		<div class="grid">
			{products.map((product, index) => (
				<div class="grid__item">
					<Product {...product} image={product.images[0]} />
				</div>
			))}
		</div>
	</div>
);

export default connect('products', actions)(Home);
