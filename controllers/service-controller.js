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
        if (req.files.pastille) {
            // Add file.
            data.pastille = req.files.pastille[0].filename;
        }
        if (req.files.image) {
            // Add file.
            data.image = req.files.image[0].filename;
            // Move existing file to right folder and create it if does not exist.
            // File - Image.
            const dir = './uploads/services/images';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const oldPath = `./uploads/pastilles/services/${req.files.image[0].filename}`;
            const newPath = `./uploads/services/images/${req.files.image[0].filename}`;
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
            });
        }
        const newService = await db.Service.create(data);
        return res.json(new SuccessObjectResponse(newService));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Service.findByPk(id);
        // Delete existing file.
        const path1 = `./uploads/pastilles/services/${target.pastille}`;
        const path2 = `./uploads/services/images/${target.image}`;
        try {
            fs.unlinkSync(path1);
            fs.unlinkSync(path2);
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
        // File - Pastille.
        if (req.files.pastille) {
            data.pastille = req.files.pastille[0].filename;
        } else {
            data.pastille = req.body.fileToKeep;
        }
        // File - Image.
        if (req.files.image) {
            data.image = req.files.image[0].filename;
        } else {
            data.image = req.body.fileImageToKeep;
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
        // File - Image.
        if (req.body.fileImageToDelete) {
            const path = `./uploads/services/images/${req.body.fileImageToDelete}`;
            try {
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }
        }
        // Move existing file to right folder and create it if does not exist.
        // File - Image.
        if (req.files.image) {
            const dir = './uploads/services/images';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const oldPath = `./uploads/pastilles/services/${req.files.image[0].filename}`;
            const newPath = `./uploads/services/images/${req.files.image[0].filename}`;
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
            });
        }

        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Service not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }

};

module.exports = serviceController;