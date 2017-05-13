/*jshint esversion: 6 */

let mongoose = require('mongoose'), Schema = mongoose.Schema;

let Venue = require('./venue');

let EventSchema = mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        startDate: Number,
        venue: { type: Schema.Types.ObjectId, ref: 'Venue' },
        bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    }
);

module.exports = EventSchema;
