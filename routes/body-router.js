const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { equipementValidator } = require('../validators/equipement-validator');
const { momentValidator } = require('../validators/moment-validator');
const { reservationValidator } = require('../validators/reservation-validator');
const { serviceValidator } = require('../validators/service-validator');
const equipementController = require('../controllers/equipement-controller');
const momentController = require('../controllers/moment-controller');
const reservationController = require('../controllers/reservation-controller');
const serviceController = require('../controllers/service-controller');
const fs = require('fs');

const bodyRouter = require('express').Router();


const multer = require('multer');
const path = require('path');

// Equipement - Multer (File upload) config.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads/pastilles/equipements`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});
const uploadEquipement = multer({ storage: storage });


// Reservation.
bodyRouter.route('/reservation')
    .get(reservationController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(reservationValidator), reservationController.add);

bodyRouter.route('/reservation/:id([0-9]+)')
    .get(reservationController.getOne)
    .delete(authentificateJwt({ adminRight: true }), reservationController.delete)
    .put(authentificateJwt({ adminRight: true }), bodyValidation(reservationValidator), reservationController.update);

// Equipement.
bodyRouter.route('/equipement')
    .get(equipementController.getAll)
    .post(authentificateJwt({ adminRight: true }), uploadEquipement.single('pastille'), bodyValidation(equipementValidator), equipementController.add);

bodyRouter.route('/equipement/:id([0-9]+)')
    .get(equipementController.getOne)
    .delete(authentificateJwt({ adminRight: true }), equipementController.delete)
    .put(authentificateJwt({ adminRight: true }), uploadEquipement.single('pastille'), bodyValidation(equipementValidator), equipementController.update);

// Service.
bodyRouter.route('/service')
    .get(serviceController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(serviceValidator), serviceController.add);

bodyRouter.route('/service/:id([0-9]+)')
    .get(serviceController.getOne)
    .delete(authentificateJwt({ adminRight: true }), serviceController.delete)
    .put(authentificateJwt({ adminRight: true }), bodyValidation(serviceValidator), serviceController.update);

// Moment.
bodyRouter.route('/moment')
    .get(momentController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(momentValidator), momentController.add);

bodyRouter.route('/moment/:id([0-9]+)')
    .get(momentController.getOne)
    .delete(authentificateJwt({ adminRight: true }), momentController.delete)
    .put(authentificateJwt({ adminRight: true }), bodyValidation(momentValidator), momentController.update);

module.exports = bodyRouter;