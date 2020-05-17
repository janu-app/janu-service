require('dotenv').config()

const config = require('./config')

const cors = require('cors')
const api = require('./api')
const services = require('./service')(config)
const express = require('express')
const pino = require('pino-http')()
const bodyParser = require('body-parser')

const app = express()

app.use(pino)
app.use(bodyParser.json())
app.use(cors());
app.use('', api(services));

app.listen(3000, function () {
  console.log('Running');
});