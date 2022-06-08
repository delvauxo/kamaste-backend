const { Sequelize } = require('sequelize');

// Sequelize Initialization
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD,
    {
        host: process.env.DB_SERVER,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        pool: {
            min: 0,
            max: 5,
            idle: 10_000,
            acquire: 30_000
        }
    }
);

// Create object DB
const db = {};

// Add instance of Sequelize
db.sequelize = sequelize;

// Add Models
db.Member = require('./member')(sequelize);
// NEW ONES.
db.Espace = require('./espace')(sequelize);
db.Reservation = require('./reservation')(sequelize);
db.Equipement = require('./equipement')(sequelize);
db.Service = require('./service')(sequelize);
db.Moment = require('./moment')(sequelize);

// Add Association
// - [Many to Many] Espace - Equipement
db.Espace.belongsToMany(db.Equipement, { through: 'EspaceEquipements' });
db.Equipement.belongsToMany(db.Espace, { through: 'EspaceEquipements' });

// - [Many to Many] Espace - Service
db.Espace.belongsToMany(db.Service, { through: 'EspaceServices' });
db.Service.belongsToMany(db.Espace, { through: 'EspaceServices' });

// Export object DB
module.exports = db;
