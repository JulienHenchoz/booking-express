/*jshint esversion: 6 */

let mongoose = require('mongoose'), Schema = mongoose.Schema;

let BookingSchema = mongoose.Schema(
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

module.exports = BookingSchema;