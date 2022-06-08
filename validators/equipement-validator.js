const yup = require('yup');

const equipementValidator = yup.object().shape({
    nom: yup.string().required().min(2),
    description: yup.string().required().min(2)
    // pastille: yup.string().required()
});

module.exports = {
    equipementValidator
};