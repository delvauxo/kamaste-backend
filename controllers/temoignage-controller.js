const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');

const temoignageController = {

    getOne: async (req, res) => {
        const id = req.params.id;
        const data = await db.Temoignage.findByPk(id);
        if (!data) {
            return res.status(404).json(new NotFoundErrorResponse('Temoignage not found !'));
        }
        return res.json(new SuccessObjectResponse(data));
    },

    getAll: async (req, res) => {
        const data = await db.Temoignage.findAndCountAll();
        if (!data) {
            return res.status(404).json(new NotFoundErrorResponse('Temoignage not found !'));
        }
        return res.json(new SuccessObjectResponse(data));
    },

    add: async (req, res) => {
        const data = req.validatedData;
        const newTemoignage = await db.Temoignage.create(data);
        return res.json(new SuccessObjectResponse(newTemoignage));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Temoignage.findByPk(id);
        await target.destroy();
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Temoignage not found !'));
        }
        return res.sendStatus(204);
    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.validatedData;
        const result = await db.Temoignage.update(data, {
            where: { id }
        });
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Temoignage not found !'));
        }
        return res.json(new SuccessObjectResponse('Data updated'));
    }
};

module.exports = temoignageController;