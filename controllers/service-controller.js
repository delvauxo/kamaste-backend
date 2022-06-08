const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');
const fs = require('fs');

const serviceController = {

    getOne: async (req, res) => {
        const id = req.params.id;
        const service = await db.Service.findByPk(id);
        if (!service) {
            return res.status(404).json(new NotFoundErrorResponse('Service not found !'));
        }
        return res.json(new SuccessObjectResponse(service));
    },

    getAll: async (req, res) => {
        const data = await db.Service.findAndCountAll();
        if (!data) {
            return res.status(404).json(new NotFoundErrorResponse('Services not found !'));
        }
        return res.json(new SuccessObjectResponse(data));
    },

    add: async (req, res) => {
        const data = req.validatedData;
        // Add file.
        data.pastille = req.file.filename;
        const newService = await db.Service.create(data);
        res.json(new SuccessObjectResponse(newService));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Service.findByPk(id);
        // Delete existing file.
        const path = `./uploads/pastilles/services/${target.pastille}`;
        try {
            fs.unlinkSync(path);
        } catch (err) {
            console.error(err);
        }
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Service not found !'));
        }
        await target.destroy();
        return res.sendStatus(204);
    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.validatedData;
        // Add file if file is sent or keep existing.
        if (req.file) {
            data.pastille = req.file.filename;
        } else {
            data.pastille = req.body.fileToKeep;
        }
        const result = await db.Service.update(data, {
            where: { id }
        });
        // Delete existing file if new one is sent.
        if (req.body.fileToDelete) {
            const path = `./uploads/pastilles/services/${req.body.fileToDelete}`;
            try {
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }
        }
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Service not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }

};

module.exports = serviceController;