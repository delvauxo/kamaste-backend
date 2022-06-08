const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize 
 * @returns Service
 */
module.exports = (sequelize) => {

    const Service = sequelize.define('service', {
        // Clé primaire.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        // Attributs.
        nom: {
            type: DataTypes.STRING,
            allowNull: null
        },
        description: {
            type: DataTypes.STRING,
            allowNull: null
        }
    });
    return Service;
};