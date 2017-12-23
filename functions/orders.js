const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore().collection('orders');

// return all orders
router.get('/', (req, res) =>
	db
		.limit(100)
		.get()
		.then(snapshot => {
			const data = [];
			snapshot.forEach(doc => {
				data.push(Object.assign({ id: doc.id }, doc.data()));
			});
			return res.send({
				orders: data
			});
		})
);

// return single order
router.get('/:id', (req, res) =>
	db
		.doc(req.params.id)
		.get()
		.then(doc => {
			if (!doc.exists) {
				return res.status(500).send('No such document!');
			}
			const docData = doc.data();
			if (docData.user.email === req.query.email) {
				return res.send(docData);
			}
			return res.status(500).send('Error getting document');
		})
		.catch(err => {
			res.status(500).send('Error getting document');
		})
);

// update an order
router.post('/:id', (req, res) => {
	//TODO
});

module.exports = router;
