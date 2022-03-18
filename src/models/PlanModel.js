'use strict';

const database = require('../Database');

const PlanModel = function (name, isGeneral, isSpecialist, isPhysiotheraphy) {
    this.id;
    this.name = name;
    this.isGeneral = isGeneral;
    this.isSpecialist = isSpecialist;
    this.isPhysiotheraphy = isPhysiotheraphy;
};

PlanModel.prototype.update = function () {
    return new Promise((resolve, reject) => {
        database.query(
            'UPDATE plans SET name=?, isGeneral=?, isSpecialist=?, isPhysiotheraphy=? WHERE id = ?',
            [this.name, this.isGeneral, this.isSpecialist, this.isPhysiotheraphy, this.id],
            (err, result) => {
                if (err)
                    reject(err);

                resolve(result);
            }
        );
    });
};

PlanModel.prototype.toPlainObject = function () {
    return {
        id: this.id,
        name: this.name,
        isGeneral: this.isGeneral,
        isSpecialist: this.isSpecialist,
        isPhysiotheraphy: this.isPhysiotheraphy
    };
};

PlanModel.add = function (planModel) {
    if (!(planModel instanceof PlanModel)) {
        throw new Error('parameter is not a PlanModel');
    }

    return new Promise((resolve, reject) => {
        database.query(
            'INSERT INTO plans (name, isGeneral, isSpecialist, isPhysiotheraphy) VALUES (?, ?, ?, ?)',
            [planModel.name, planModel.isGeneral, planModel.isSpecialist, planModel.isPhysiotheraphy],
            (err, results) => {
                if (err)
                    reject(err);

                resolve(results.insertId);
            }
        );
    });
};

PlanModel.getAll = function () {
    return new Promise((resolve, reject) => {
        database.query(
            'SELECT id, name, isGeneral, isSpecialist, isPhysiotheraphy FROM plans',
            (err, results) => {
                if (err)
                    reject(err);

                const plans = results.map(plan => {
                    const newPlan = new PlanModel(plan.name, plan.isGeneral, plan.isSpecialist, plan.isPhysiotheraphy);

                    newPlan.id = plan.id;

                    return newPlan;
                });

                resolve(plans);
            }
        );
    });
};

module.exports = PlanModel;