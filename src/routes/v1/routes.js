'use strict';

const express = require('express');
const plans = require('./plans');

const app = express();

app.use(plans);

module.exports = app;