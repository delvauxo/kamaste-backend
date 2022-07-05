const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');
const fs = require('fs');

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
        if (req.files.pastille) {
            // Add file.
            data.pastille = req.files.pastille[0].filename;
        }
        if (req.files.image) {
            // Add file.
            data.image = req.files.image[0].filename;
            // Move existing file to right folder and create it if does not exist.
            // File - Image.
            const dir = './uploads/moments/images';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const oldPath = `./uploads/pastilles/moments/${req.files.image[0].filename}`;
            const newPath = `./uploads/moments/images/${req.files.image[0].filename}`;
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
            });
        }
        // Insert data in DB.
        const newMoment = await db.Moment.create(data);
        res.json(new SuccessObjectResponse(newMoment));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Moment.findByPk(id);
        // Delete existing file.
        const path1 = `./uploads/pastilles/moments/${target.pastille}`;
        const path2 = `./uploads/moments/images/${target.image}`;
        try {
            fs.unlinkSync(path1);
            fs.unlinkSync(path2);
        } catch (err) {
            console.error(err);
        }
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Moment not found !'));
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
        const result = await db.Moment.update(data, {
            where: { id }
        });
        // Delete existing file if new one is sent.
        // File - Pastille.
        if (req.body.fileToDelete) {
            const path = `./uploads/pastilles/moments/${req.body.fileToDelete}`;
            try {
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }
        }
        // File - Image.
        if (req.body.fileImageToDelete) {
            const path = `./uploads/moments/images/${req.body.fileImageToDelete}`;
            try {
                fs.unlinkSync(path);
            } catch (err) {
                console.error(err);
            }
        }
        // Move existing file to right folder and create it if does not exist.
        // File - Image.
        if (req.files.image) {
            const dir = './uploads/moments/images';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            const oldPath = `./uploads/pastilles/moments/${req.files.image[0].filename}`;
            const newPath = `./uploads/moments/images/${req.files.image[0].filename}`;
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err;
            });
        }


        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Moment not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }
};

module.exports = momentController;