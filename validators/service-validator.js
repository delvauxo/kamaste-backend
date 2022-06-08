const yup = require('yup');

const serviceValidator = yup.object().shape({
    nom: yup.string().required().min(2),
    description: yup.string().required().min(2)
});

module.exports = {
    serviceValidator
};