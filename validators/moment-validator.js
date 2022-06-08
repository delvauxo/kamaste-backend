const yup = require('yup');

const momentValidator = yup.object().shape({
    nom: yup.string().trim().required().min(2),
    lien: yup.string().url(),
    description: yup.string().required().min(2)
});

module.exports = {
    momentValidator
};