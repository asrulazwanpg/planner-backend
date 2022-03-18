'use strict';

const { check, validationResult } = require('express-validator');
const PlanModel = require('../models/PlanModel');

const PlanController = {};

PlanController.getAllPlan = async function (req, res) {
	const result = {
		success: true,
		message: 'Successfully get all plan',
		results: []
	};

	try {
		const plans = await PlanModel.getAll();

		result.results = plans.map(plan => plan.toPlainObject());
	}
	catch (error) {
		result.success = false;
		result.message = error.message;

		res.status(500);
	}

	res.json(result);
}

PlanController.addPlan = async function (req, res) {
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
}

PlanController.validatePlan = [
	check('name', 'name must be between 1 and 15 characters').isLength({ min: 1, max: 15 }).trim().escape(),
	check('isGeneral', 'isGeneral must be a boolean').isBoolean(),
	check('isSpecialist', 'isSpecialist must be a boolean').isBoolean(),
	check('isPhysiotheraphy', 'isPhysiotheraphy must be a boolean').isBoolean()
];

module.exports = PlanController