const { Op } = require('sequelize');
const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');

const espaceController = {

    getOne: async (req, res) => {
        const id = req.params.id;
        const target = await db.Espace.findByPk(id);
        if (!target) {
            return res.status(404).json('Espace not found !');
        }
        return res.json(new SuccessObjectResponse(target));
    },

    getAll: async (req, res) => {
        const espaces = await db.Espace.findAndCountAll();
        return res.json(espaces);
    },

    add: async (req, res) => {
        const data = req.validatedData;
        const newEspace = await db.Espace.create(data);
        res.json(new SuccessObjectResponse(newEspace));
    },

    delete: async (req, res) => {
        // Get id from url params.
        const id = req.params.id;
        // Get element from database based on url ID given.
        const target = await db.Espace.findByPk(id);
        // If not found in database.
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Espace not found !'));
        }
        // Delete element from database.
        await target.destroy();
        // Send status.
        res.sendStatus(204);
    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.validatedData;
        const result = await db.Espace.update(data, {
            where: { id }
        });
        console.log(result);
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Espace not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }
};

module.exports = espaceController;