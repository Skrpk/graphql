const { formatDate } = require('../../helpers/date');
const db = require('../../database/models');

const transformEvent = event => ({
  ...event,
  ...{ date: formatDate(event.date) }
});

module.exports = {
  events: async () => {
    const events = await db.Event.scope('withUser').findAll({
      include: [{
        model: db.User.scope('withEvents'),
        as: 'user'
      }]
    });

    return events.map(event => transformEvent(event));
  },
  createEvent: async (args) => {
    const event = await db.Event.create({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: args.eventInput.date,
      userId: '9cf54806-49c3-4b83-a91d-bce8e7a4895d'
    });

    return event;
  },
};