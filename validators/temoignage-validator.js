const yup = require('yup');

const temoignageValidator = yup.object().shape({
    client: yup.string().required().min(2),
    texte: yup.string().required().min(2)
});

module.exports = {
    temoignageValidator
};