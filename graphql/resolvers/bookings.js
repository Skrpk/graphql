const { formatDate } = require('../../helpers/date');
const db = require('../../database/models');

const transformBooking = booking => ({
  ...booking,
  ...{
    createdAt: formatDate(booking.createdAt),
    updatedAt: formatDate(booking.updatedAt),
  }
});

module.exports = {
  bookings: async () => {
    try {
      const bookings = await db.Booking.scope('withModels').findAll();

      return bookings.map(booking => transformBooking(booking));
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }

    const booking = await db.Booking.create({
      eventId: args.eventId,
      userId: '9cf54806-49c3-4b83-a91d-bce8e7a4895d'
    });

    return await db.Booking.scope('withModels').findByPk(booking.id);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated');
    }

    const booking = await db.Booking.scope('withModels').findByPk(args.bookingId);
    const event = booking.event;

    await booking.destroy();

    return event;
  }
};