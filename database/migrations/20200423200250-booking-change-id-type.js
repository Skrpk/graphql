'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Bookings', 'id', {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.changeColumn('Bookings', 'id', {
      type: DataTypes.INTEGER,
      unique: true
    });
  }
};