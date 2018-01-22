const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

const db = admin.firestore().collection('orders');

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

module.exports = router;
