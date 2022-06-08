const { Sequelize, DataTypes } = require('sequelize');

/**
 * Représentation du model Message
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {

    // Initialize model Message
    const Espace = sequelize.define('espace', {
        // Clé primaire.
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        // Attributs
        nom: {
            type: DataTypes.STRING(55),
            allowNull: false
        }
    });
    return Espace;
};
