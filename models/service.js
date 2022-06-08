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
            allowNull: false
        },
        lien: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pastille: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Service;
};