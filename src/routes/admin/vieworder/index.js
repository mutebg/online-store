import { h, Component } from 'preact';
import './style';
import reqAuth from '../reqAuth';

export class ViewOrder extends Component {
	state = {
		orders: []
	};

	componentDidMount() {
		this.props.firebase
			.firestore()
			.collection('orders')
			.doc(this.props.id)
			.get()
			.then(doc => {
				if (doc.exists) {
					this.setState({
						order: doc.data()
					});
				}
				else {
					console.log('No such document!');
				}
			});
	}

	render({ id }, { order }) {
		return <div>{JSON.stringify(order)}</div>;
	}
}

export default reqAuth(ViewOrder);
