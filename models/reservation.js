const { Sequelize, DataTypes } = require('sequelize');

/**
 * Représentation du model Message
 * @param {Sequelize} sequelize
 * @returns
 */
module.exports = (sequelize) => {

    const Reservation = sequelize.define('reservation', {

        // Clé primaire.
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true
        },
        // Attributs.
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nbr_personnes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        moment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duree: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commentaire: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        prix: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        accompte: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });
    return Reservation;
};