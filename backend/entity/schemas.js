/*jshint esversion: 6 */

let mongoose = require('mongoose'), Schema = mongoose.Schema;

let booking = mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        nbExpected: Number,
        showedUp: Boolean,
        subscribedToNewsletter: Boolean,
        subscribeDate: Number,
        event: { type: Schema.Types.ObjectId, ref: 'Event' },
    }
);

let event = mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        startDate: Number,
        venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
        bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    }
);

let venue = mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        address: String,
        city: String,
        phone: String,
        website: String,
        image: String,
        capacity: Number,
        events: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
    }
);


module.exports = {
    booking,
    venue,
    event
};
