const yup = require('yup');

const momentValidator = yup.object().shape({
    nom: yup.string().trim().required().min(2),
    lien: yup.string(),
    description: yup.string().required().min(2),
    hours: yup.number().required().positive().integer(),
    people: yup.number().required().positive().integer(),
    price: yup.number().required().positive().integer()
});

module.exports = {
    momentValidator
};