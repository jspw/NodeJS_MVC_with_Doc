const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', 'test', 'test123', {
    dialect: 'mysql', host: 'localhost',
});

module.exports = sequelize;