/*jshint esversion: 6 */

let mongoose = require('mongoose');

let Venue = mongoose.model(
    'Venue',
    {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        address: String,
        city: String,
        capacity: Number,
    }
);

module.exports = {
    Venue
};