const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');

const momentController = {

    getOne: async (req, res) => {
        const id = req.params.id;
        const moment = await db.Moment.findByPk(id);
        if (!moment) {
            return res.status(404).json(new NotFoundErrorResponse('Moment not found !'));
        }
        return res.json(new SuccessObjectResponse(moment));
    },

    getAll: async (req, res) => {
        const data = await db.Moment.findAndCountAll();
        if (!data) {
            return res.status(404).json(new NotFoundErrorResponse('Moments not found !'));
        }
        return res.json(new SuccessObjectResponse(data));
    },

    add: async (req, res) => {
        const data = req.validatedData;
        const newMoment = await db.Moment.create(data);
        res.json(new SuccessObjectResponse(newMoment));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Moment.findByPk(id);
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Moment not found !'));
        }
        await target.destroy();
        return res.sendStatus(204);
    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.validatedData;
        const result = await db.Moment.update(data, {
            where: { id }
        });
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Moment not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }
};

module.exports = momentController;