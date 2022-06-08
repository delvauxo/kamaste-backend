const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {

    const Moment = sequelize.define('moment', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lien: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pastille: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Moment;
};