const Sequelize = require('sequelize')

const skima = new Sequelize({
    dialect: 'sqlite',
    storage: './db-dev.sqlite',
    operatorsAliases: Sequelize.Op,
    logging: console.log
});

module.exports = {
     Sequelize,
     skima
}