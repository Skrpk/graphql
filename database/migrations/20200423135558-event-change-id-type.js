'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Events', 'id', {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Events', 'id', {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    });
  }
};