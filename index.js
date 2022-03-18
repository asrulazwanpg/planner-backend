require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const compression = require('compression')
const routesVersion1 = require('./src/routes/v1/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routesVersion1);

app.listen(port, () => console.log(`App listening on port ${port}`));