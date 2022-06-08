const yup = require('yup');

const espaceValidator = yup.object().shape({
    nom: yup.string().trim().required().max(50)
});

module.exports = {
    espaceValidator
};