const espaceController = require('../controllers/espace-controller');
const { authentificateJwt } = require('../middlewares/authentificate-jwt');
const bodyValidation = require('../middlewares/body-validation-middleware');
const { espaceValidator } = require('../validators/espace-validator');

const espaceRouter = require('express').Router();

espaceRouter.route('/')
    .get(espaceController.getAll)
    .post(authentificateJwt({ adminRight: true }), bodyValidation(espaceValidator), espaceController.add);

espaceRouter.route('/:id([0-9]+)')
    .get(espaceController.getOne)
    .delete(authentificateJwt({ adminRight: true }), espaceController.delete)
    .put(authentificateJwt({ adminRight: true }), bodyValidation(espaceValidator), espaceController.update);

module.exports = espaceRouter;