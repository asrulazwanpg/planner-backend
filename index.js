const express = require('express');
const bodyParser = require('body-parser')
const planController = require('./src/controllers/PlanController');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', planController);

app.listen(port, () => 
{
	console.log(`App listening on port ${port}`);
});