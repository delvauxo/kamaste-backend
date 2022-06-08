const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');
const fs = require('fs');

const equipementController = {

    getOne: async (req, res) => {
        const id = req.params.id;
        const equipement = await db.Equipement.findByPk(id);
        if (!equipement) {
            return res.status(404).json(new NotFoundErrorResponse('Equipement not found !'));
        }
        return res.json(new SuccessObjectResponse(equipement));
    },

    getAll: async (req, res) => {
        const data = await db.Equipement.findAndCountAll();
        if (!data) {
            return res.status(404).json(new NotFoundErrorResponse('Equipements not found !'));
        }
        return res.json(new SuccessObjectResponse(data));
    },

    add: async (req, res) => {
        const data = req.validatedData;
        // Add file.
        data.pastille = req.file.filename;
        const newEquipement = await db.Equipement.create(data);
        res.json(new SuccessObjectResponse(newEquipement));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Equipement.findByPk(id);
        // Delete existing file.
        const path = `./uploads/pastilles/equipements/${target.pastille}`;
        try {
            fs.unlinkSync(path);
        } catch (err) {
            console.error(err);
        }
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Equipement not found !'));
        }
        await target.destroy();
        return res.sendStatus(204);
    },

    update: async (req, res) => {
        console.log(req.body);
        const id = req.params.id;
        const data = req.validatedData;
        // Add file if file is sent or keep existing.
        if (req.file) {
            data.pastille = req.file.filename;
        } else {
            data.pastille = req.body.fileToKeep;
        }
        const result = await db.Equipement.update(data, {
            where: { id }
        });
        // Delete existing file if new one is sent.
        if (req.body.fileToDelete) {
            const path = `./uploads/pastilles/equipements/${req.body.fileToDelete}`;
            try {
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }
        }
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Equipement not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }
};

module.exports = equipementController;