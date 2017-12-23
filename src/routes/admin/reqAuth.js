import { h, Component } from 'preact';
//import { auth } from '../../utils/firebase';
import firebase from 'firebase';
require('firebase/firestore');

export default function(ComposedComponent) {
	class Authentication extends Component {
		state = {
			isLogged: false
		};

		submitForm = e => {
			e.preventDefault();
			const email = document.querySelector('#email').value;
			const password = document.querySelector('#password').value;
			window.firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(data => {
					//					console.log({ data });
				})
				.catch(error => {
					// let errorCode = error.code;
					// let errorMessage = error.message;
				});
		};

		componentDidMount() {
			if (!window.firebase) {
				let config = {
					apiKey: 'AIzaSyASQ6vjQClYL5Z3ro4UDAilAL3TkIQXG4E',
					authDomain: 'onlinestore-2e046.firebaseapp.com',
					databaseURL: 'https://onlinestore-2e046.firebaseio.com',
					projectId: 'onlinestore-2e046'
				};
				firebase.initializeApp(config);
				window.firebase = firebase;
				window.firebase.auth().onAuthStateChanged(user => {
					if (user) {
						this.setState({
							isLogged: true
						});
					}
					else {
						this.setState({
							isLogged: false
						});
					}
				});
			}
			else if (window.firebase && window.firebase.auth().currentUser) {
				this.setState({
					isLogged: true
				});
			}
			else {
				this.setState({
					isLogged: false
				});
			}
		}

		render(_, { isLogged }) {
			if (!isLogged) {
				return (
					<form onSubmit={this.submitForm}>
						<input name="email" id="email" type="email" placeholder="Email" />
						<input
							name="password"
							id="password"
							type="password"
							placeholder="Password"
						/>
						<button type="submit">Login</button>
					</form>
				);
			}

			return <ComposedComponent {...this.props} firebase={window.firebase} />;
		}
	}

	return Authentication;
}
