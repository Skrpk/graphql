'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.changeColumn('Users', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.changeColumn('Events', 'id', {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    });
  }
};