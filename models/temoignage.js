const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize 
 * @returns Temoignage
 */
module.exports = (sequelize) => {

    const Temoignage = sequelize.define('temoignage', {
        // Clé primaire.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client: {
            type: DataTypes.STRING,
            allowNull: false
        },
        texte: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
    return Temoignage;
};