module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.addColumn('Events', 'userId', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },

  down: queryInterface => queryInterface.removeColumn('Event', 'userId'),
};
