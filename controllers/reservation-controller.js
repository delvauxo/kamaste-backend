const db = require('../models');
const { NotFoundErrorResponse, ErrorResponse } = require('../response-schemas/error-schema');
const { SuccessObjectResponse } = require('../response-schemas/succes-schema');

const reservationController = {

    getOne: async (req, res) => {
        const id = req.params.id;
        const reservation = await db.Reservation.findByPk(id);
        if (!reservation) {
            return res.status(404).json(new NotFoundErrorResponse('Reservation not found !'));
        }
        return res.json(reservation);
    },

    getAll: async (req, res) => {
        const data = await db.Reservation.findAndCountAll();
        return res.json(data);
    },

    add: async (req, res) => {
        const data = req.validatedData;
        const newReservation = await db.Reservation.create(data);
        res.json(new SuccessObjectResponse(newReservation));
    },

    delete: async (req, res) => {
        const id = req.params.id;
        const target = await db.Reservation.findByPk(id);
        if (!target) {
            return res.status(404).json(new NotFoundErrorResponse('Reservation not found !'));
        }
        await target.destroy();
        return res.sendStatus(204);
    },

    update: async (req, res) => {
        const id = req.params.id;
        const data = req.validatedData;
        const result = await db.Reservation.update(data, {
            where: { id }
        });
        if (result[0] !== 1) {
            return res.status(400).json(new ErrorResponse('Reservation not found !'));
        }
        res.json(new SuccessObjectResponse('Data updated'));
    }
};

module.exports = reservationController;