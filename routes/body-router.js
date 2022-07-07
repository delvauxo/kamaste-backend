const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { equipementValidator } = require('../validators/equipement-validator');
const { momentValidator } = require('../validators/moment-validator');
const { serviceValidator } = require('../validators/service-validator');
const { temoignageValidator } = require('../validators/temoignage-validator');
const equipementController = require('../controllers/equipement-controller');
const momentController = require('../controllers/moment-controller');
const serviceController = require('../controllers/service-controller');
const temoignageController = require('../controllers/temoignage-controller');
const fs = require('fs');

const bodyRouter = require('express').Router();

const multer = require('multer');
const path = require('path');

// Equipement - Multer (File upload) config.
const EquipementStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads/pastilles/equipements`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});
const uploadEquipement = multer({ storage: EquipementStorage });

// Moment - Multer (File upload) config.
const momentStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads/pastilles/moments`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});
const uploadMoment = multer({ storage: momentStorage });

// Service - Multer (File upload) config.
const ServiceStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads/pastilles/services`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
    }
});
const uploadService = multer({ storage: ServiceStorage });

// Equipement.
bodyRouter.route('/equipement')
    .get(equipementController.getAll)
    .post(
        authentificateJwt({ adminRight: true }),
        uploadEquipement.fields([{ name: 'pastille' }, { name: 'image' }]),
        bodyValidation(equipementValidator),
        equipementController.add
    );

bodyRouter.route('/equipement/:id([0-9]+)')
    .get(equipementController.getOne)
    .delete(authentificateJwt({ adminRight: true }), equipementController.delete)
    .put(
        authentificateJwt({ adminRight: true }),
        uploadEquipement.fields([{ name: 'pastille' }, { name: 'image' }]),
        bodyValidation(equipementValidator),
        equipementController.update
    );

// Service.
bodyRouter.route('/service')
    .get(serviceController.getAll)
    .post(authentificateJwt({ adminRight: true }), uploadService.single('pastille'), bodyValidation(serviceValidator), serviceController.add);

bodyRouter.route('/service/:id([0-9]+)')
    .get(serviceController.getOne)
    .delete(authentificateJwt({ adminRight: true }), serviceController.delete)
    .put(authentificateJwt({ adminRight: true }), uploadService.single('pastille'), bodyValidation(serviceValidator), serviceController.update);

// Moment.
bodyRouter.route('/moment')
    .get(momentController.getAll)
    .post(
        authentificateJwt({ adminRight: true }),
        uploadMoment.fields([{ name: 'pastille' }, { name: 'image' }]),
        bodyValidation(momentValidator),
        momentController.add
    );

bodyRouter.route('/moment/:id([0-9]+)')
    .get(momentController.getOne)
    .delete(authentificateJwt({ adminRight: true }), momentController.delete)
    .put(
        authentificateJwt({ adminRight: true }),
        uploadMoment.fields([{ name: 'pastille' }, { name: 'image' }]),
        bodyValidation(momentValidator),
        momentController.update
    );

// Temoignage.
bodyRouter.route('/temoignage')
    .get(temoignageController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(temoignageValidator), temoignageController.add);

bodyRouter.route('/temoignage/:id([0-9]+)')
    .get(temoignageController.getOne)
    .delete(authentificateJwt({ adminRight: true }), temoignageController.delete)
    .put(authentificateJwt({ adminRight: true }), bodyValidation(temoignageValidator), temoignageController.update);

module.exports = bodyRouter;