const yup = require('yup');

const serviceValidator = yup.object().shape({
    nom: yup.string().required().min(2),
    lien: yup.string().url().required(),
    description: yup.string().required().min(2)
});

module.exports = {
    serviceValidator
};