const jwt = require('jsonwebtoken');
const db = require('../../database/models');

module.exports = {
  createUser: async (args) => {
    const user = await db.User.create({
      email: args.eventInput.email,
      password: args.eventInput.password
    });

    return user;
  },

  login: async ({ email, password }) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user || !user.correctPassword(password)) {
      throw new Error('Invalid creds');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    );

    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  }
};