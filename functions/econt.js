const express = require('express');
const router = express.Router();
const request = require('request');
const xml2js = require('xml-js');
const admin = require('firebase-admin');

router.get('/load', (req, res) => {
	const url = 'http://demo.econt.com/e-econt/xml_service_tool.php';

	const post = request(
		{
			method: 'POST',
			url,
			headers: {
				'Content-Type': 'text/xml'
			}
		},
		(error, response, body) => {
			let result1 = xml2js.xml2js(body);

			const offices = result1.elements[0].elements[0].elements
				.map(o =>
					o.elements.reduce((prev, next) => {
						if (
							next.elements &&
							next.name !== 'address_details' &&
							next.name !== 'office_details'
						) {
							prev[next.name] = next.elements[0].text;
						}
						return prev;
					}, {})
				)
				.filter(o => o.country_code === 'BGR');

			offices.forEach(o => {
				admin
					.firestore()
					.collection('offices')
					.doc(o.id)
					.set(o);
			});

			res.json({ ok: true });
		}
	);

	const form = post.form();
	form.append(
		'xml',
		`<request><client><username>demo</username><password>demo</password></client><request_type>offices</request_type></request>`
	);
});

router.get('/offices', (req, res) => {
	const cities = [];
	admin
		.firestore()
		.collection('offices')
		.orderBy('city_name')
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				const cityName = doc.data().city_name;
				if (cities.indexOf(cityName) === -1) {
					cities.push(cityName);
				}
			});
			res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
			res.json({
				cities
			});
		});
});

router.get('/offices/:city', (req, res) => {
	const offices = [];
	admin
		.firestore()
		.collection('offices')
		.where('city_name', '=', req.params.city)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				offices.push(doc.data());
			});
			res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
			res.json({
				offices
			});
		});
});

router.post('/calculate/:type', (req, res) => {
	const receiver =
		req.params.type === 'office'
			? `
	<office_code>${req.body.office_code}</office_code>
	`
			: `
	<post_code>${req.body.post_code}</post_code>
	<city>${req.body.city}</city>
	<quarter>${req.body.quarter}</quarter>
	<street>${req.body.street}</street>
	<street_num>${req.body.street_num}</street_num>
	`;

	const xml = `
	 <parcels>
		 <client>
			 <username>demo</username>
			 <password>demo</password>
		 </client>
		 <system>
			 <validate>0</validate>
			 <response_type>XML</response_type>
			 <only_calculate>1</only_calculate>
		 </system>
		 <loadings>
			 <row>
				 <sender>
					 <city>Ruse</city>
					 <post_code>7000</post_code>
					 <office_code>7000</office_code>
					 <name>Иван Иванов</name>
					 <name_person></name_person>
					 <phone_num>08888888888</phone_num>
				 </sender>
				 <receiver>
					 <name>Петър Петров</name>
					 <phone_num>08888888888</phone_num>
					 <sms_no/>
					 ${receiver}
				 </receiver>
				 <shipment>
					 <envelope_num>111111,22222,3332342</envelope_num>
					 <shipment_type>PACK</shipment_type>
					 <description>description of the content content</description>
					 <pack_count>1</pack_count>
					 <weight>1</weight>
					 <tariff_sub_code>${
	req.params.type === 'office' ? 'OFFICE_OFFICE' : 'OFFICE_DOOR'
}</tariff_sub_code>
					 <invoice_before_pay_CD/>
					 <pay_after_accept>1</pay_after_accept>
					 <pay_after_test>0</pay_after_test>
				 </shipment>
				 <services>
				 </services>
				 <payment>
					 <side>SENDER</side>
					 <method>CASH</method>
				 </payment>
			 </row>
		 </loadings>
	 </parcels>
	 `;

	const url = 'http://demo.econt.com/e-econt/xml_parcel_import2.php';

	const post = request(
		{
			method: 'POST',
			url,
			headers: {
				'Content-Type': 'text/xml'
			}
		},
		(error, response, body) => {
			let result = xml2js.xml2js(body);
			const link = result.elements[0].elements[0].elements[0].elements;
			// res.json(link);
			// return;
			let hasError = false;
			let total = 0;
			link.forEach(item => {
				if (item.name === 'error' && item.elements) {
					hasError = item.elements[0].text;
					return;
				}
				if (item.name === 'loading_price') {
					total = item.elements[1].elements[0].text;
				}
			});
			if (hasError) {
				res.json({
					success: false,
					message: hasError
				});
			}
			else {
				res.json({
					success: true,
					total
				});
			}
		}
	);

	const form = post.form();
	form.append('xml', xml);
});

module.exports = router;
