'use strict';

const express = require('express');
const { check, validationResult } = require('express-validator');
const PlanModel = require('../models/PlanModel');

const router = express.Router();
const planRoute = router.route('/plans');

const validatePlan = [
	check('name', 'name must be between 1 and 15 characters').isLength({ min: 1, max: 15 }).trim().escape(),
	check('isGeneral', 'isGeneral must be a boolean').isBoolean(),
	check('isSpecialist', 'isSpecialist must be a boolean').isBoolean(),
	check('isPhysiotheraphy', 'isPhysiotheraphy must be a boolean').isBoolean()
];

planRoute.get(async (req, res) => {
	const result = {
		success: true,
		message: 'Successfully get all plan',
		results: []
	};

	try {
		const plans = await PlanModel.getAll();
		result.results = plans;
		console.log(plans)
		// result.results = plans.map(plan => plan.toPlainObject());
	}
	catch (error) {
		result.success = false;
		result.message = error.message;

		res.status(500);
	}

	res.json(result);
});

planRoute.post(validatePlan, async (req, res) => {
	const result = {
		success: true,
		message: 'Successfully add plan'
	};

	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			result.errors = errors.array();

			throw new Error('Validation Error');
		}

		const planModel = new PlanModel(req.body.name, req.body.isGeneral, req.body.isSpecialist, req.body.isPhysiotheraphy);

		planModel.id = await PlanModel.add(planModel);
		result.results = planModel.toPlainObject();
	}
	catch (error) {
		result.success = false;
		result.message = error.message;

		res.status(result.message === 'Validation Error' ? 400 : 500);
	}

	res.json(result);
});

module.exports = router;