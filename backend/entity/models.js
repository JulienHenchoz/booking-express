/*jshint esversion: 6 */

let mongoose = require('mongoose');
let schemas = require('./schemas');

let venue = mongoose.model('Venue', schemas.venue);
let event = mongoose.model('Event', schemas.event);
let booking = mongoose.model('Booking', schemas.booking);

module.exports = {
    venue,
    event,
    booking
};
