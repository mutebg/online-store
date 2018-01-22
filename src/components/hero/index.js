import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import './style';

const Hero = ({ image, price, name, id }) => (
	<section
		class="hero"
		style={{
			backgroundImage: `url('https://d3qy582t7d8gpp.cloudfront.net/images/justin-two.jpg')`
		}}
	>
		<h1>Гривна с вашето име</h1>
		<p>Идеален подарък за св. Валентин</p>
		<Link class="btn" to="/">
			Купи сега
		</Link>
	</section>
);

export default Hero;
