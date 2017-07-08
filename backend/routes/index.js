const express = require('express');
const isOnline = require('is-online');
const router = express.Router();
var request = require('request');


router.post('/api', (req, res, next) => {
	isOnline().then(online => {
	    if(online) {
	    	const apiData = req.body;
			const businessId = apiData.businessId;
			const businessName = apiData.businessName;
			const requestApiUrl = `http://avoindata.prh.fi/bis/v1?name=${businessName}&businessId=${businessId}`;
			console.log(requestApiUrl);
			let response = {};
			request(requestApiUrl, function (error, apires, body) {
				if(error) {
					response.status = 404;
					response.message = "There is something wrong. Please Try Again.";
					response.data = "";
					return res.json(response);
				}

				const apiResonse = JSON.parse(apires.body);
				if(apiResonse.results.length > 0) {
					response.status = 200;
					response.message = "Congretulation! Data Found";
					response.data = JSON.parse(apires.body);
					res.json(response);
				} else {
					response.status = 201;
					response.message = "Sorry ! Data Not Found Which You want to Search.";
					response.data = "";
					res.json(response);
				}
			});
		} else {
			let response = {};
			response.status = 500;
			response.message = "Sorry ! Please Connect With Internet.";
			response.data = "";
			res.json(response);
	    }
	});
	
});

module.exports = router;
