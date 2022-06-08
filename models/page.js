const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize 
 * @returns 
 */
module.exports = (sequelize) => {

    const Page = sequelize.define('page', {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dicton: {
            type: DataTypes.STRING,
            allowNull: true
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Page;
};