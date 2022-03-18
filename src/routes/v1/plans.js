'use strict';

const express = require('express');
const PlanController = require('../../controllers/PlanController');

const router = express.Router();
const planRoute = router.route('/plans');

planRoute.get(PlanController.getAllPlan);
planRoute.post(PlanController.validatePlan, PlanController.addPlan);

module.exports = router;