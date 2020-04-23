module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.addColumn('Users', 'createdAt', {
      allowNull: false,
      type: DataTypes.DATE
    });
  },

  down: queryInterface => queryInterface.removeColumn('Event', 'createdAt'),
};
