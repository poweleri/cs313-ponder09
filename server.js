const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/getRate", function(req, res){
	console.log("Calculating price...");
	const mailType = req.query.mailType;
	const weight = req.query.weight;
	
	console.log(`Type:   ${mailType}`);
	console.log(`Weight: ${weight}`);

	calculateRate(weight, mailType, function(params){
		res.render("rate", params);
	});
});

app.listen(port, function(){
	console.log(`Listening on port: ${port}`);
});


function calculateRate(weight, type, handleResponse) {
	const numWeight = Number(weight);
	console.log(`${numWeight}`);

	var rate = 0;
	switch(type) {
		case "letterStamp":
			if (numWeight < 1)
				rate = 0.55;
			else if (numWeight < 2)
				rate = 0.70;
			else if (numWeight < 3)
				rate = 0.85;
			else
				rate = 1.00;
			break;
		case "letterMeter":
			if (numWeight < 1)
				rate = 0.50;
			else if (numWeight < 2)
				rate = 0.65;
			else if (numWeight < 3)
				rate = 0.80;
			else
				rate = 0.95;
			break;
		case "largeEnvelopes":
			if (numWeight < 1)
				rate = 1.00;
			else if (numWeight < 2)
				rate = 1.15;
			else if (numWeight < 3)
				rate = 1.30;
			else if (numWeight < 4)
				rate = 1.45;
			else if (numWeight < 5)
				rate = 1.60;
			else if (numWeight < 6)
				rate = 1.75;
			else if (numWeight < 7)
				rate = 1.90;
			else if (numWeight < 8)
				rate = 2.05;
			else if (numWeight < 9)
				rate = 2.20;
			else if (numWeight < 10)
				rate = 2.35;
			else if (numWeight < 11)
				rate = 2.50;
			else if (numWeight < 12)
				rate = 2.65;
			else
				rate = 2.80;
			break;
		default:
			if (numWeight < 4)
				rate = 3.66;
			else if (numWeight < 8)
				rate = 4.39;
			else if (numWeight < 12)
				rate = 5.19;
			else
				rate = 5.71;
	}

	console.log(`Calculated Rate: ${rate.toFixed(2)}`)

	const params = {
		rate: rate.toFixed(2)
	};

	handleResponse(params);
}