/*jshint esversion: 6 */

let mongoose = require('mongoose');

let VenueSchema = mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        name: String,
        address: String,
        city: String,
        capacity: Number,
    }
);

module.exports = VenueSchema;