import firebase from 'firebase/app';
require('firebase/firestore');

let config = {
	apiKey: 'AIzaSyASQ6vjQClYL5Z3ro4UDAilAL3TkIQXG4E',
	authDomain: 'onlinestore-2e046.firebaseapp.com',
	databaseURL: 'https://onlinestore-2e046.firebaseio.com',
	projectId: 'onlinestore-2e046',
	storageBucket: '',
	messagingSenderId: '1045717169746'
};
firebase.initializeApp(config);

const db = firebase.firestore();

export const getProducts = () =>
	db
		.collection('products')
		.get()
		.then(snapshot => {
			const list = [];
			snapshot.forEach(doc => {
				list.push({
					id: doc.id,
					...doc.data()
				});
			});
			return list;
		});

export const getProductProps = id =>
	db
		.collection('products/' + id + '/properties')
		.get()
		.then(snapshot => {
			const list = [];
			snapshot.forEach(doc => {
				list.push({
					id: doc.id,
					...doc.data()
				});
			});
			return list;
		});

export const getProduct = id =>
	db
		.collection('products')
		.doc(id)
		.get()
		.then(doc => {
			if (doc.exists) {
				return doc.data();
			}
			throw 'No such document!';
		})
		.catch(error => {
			console.log('Error getting document:', error);
		});
