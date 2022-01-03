var Sequelize = require('sequelize');

var User = (sequelize, type) => {
  return sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    uuid: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    otp: Sequelize.STRING,
    type: Sequelize.STRING,
    is_verified: Sequelize.INTEGER,
  })
}

module.exports = User;