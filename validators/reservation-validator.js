const yup = require('yup');

const reservationValidator = yup.object().shape({
    date: yup.date().required(),
    nbr_personnes: yup.number().required(),
    moment: yup.string().required(),
    duree: yup.number().required(),
    commentaire: yup.string().required(),
    prix: yup.number().required(),
    accompte: yup.number().required()
});

module.exports = {
    reservationValidator
};