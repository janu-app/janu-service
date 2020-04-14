require('dotenv').config()

const config = require('./config')

const cors = require('cors')
const api = require('./api')
const services = require('./service')(config)
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors());
app.use('', api(services));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});