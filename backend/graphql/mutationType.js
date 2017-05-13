/*jshint esversion: 6 */

let graphql = require('graphql');

let venueInputType = require('./types/inputTypes/venue');
let venueSchema = require('../schemas/venue');

let eventInputType = require('./types/inputTypes/event');
let eventSchema = require('../schemas/event');

let bookingInputType = require('./types/inputTypes/booking');
let bookingSchema = require('../schemas/booking');

let mongoose = require('mongoose');

let objecTypes = require('./objectTypes');

let mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createVenue: {
            type: objecTypes.venue,
            args: {
                venue: {
                    type: new graphql.GraphQLNonNull(venueInputType)
                }
            },
            resolve: function (value, args) {
                let Venue = mongoose.model('Venue', venueSchema);
                console.log('Inserted venue in DB');
                let venue = new Venue(args.venue);
                return venue.save();
            }
        },
        createEvent: {
            type: objecTypes.event,
            args: {
                event: {
                    type: new graphql.GraphQLNonNull(eventInputType)
                }
            },
            resolve: function (value, args) {
                let Event = mongoose.model('Event', eventSchema);
                console.log('Inserted event in DB');
                let event = new Event(args.event);
                return event.save();
            }
        },
        createBooking: {
            type: objecTypes.booking,
            args: {
                booking: {
                    type: new graphql.GraphQLNonNull(bookingInputType)
                }
            },
            resolve: function (value, args) {
                let Booking = mongoose.model('Booking', bookingSchema);
                let Event = mongoose.model('Event', eventSchema);
                console.log('Inserted booking in DB');

                let booking = new Booking(args.booking);
                return booking.save(function(err, savedBooking) {
                     Event.findOne({_id: args.booking.event}).exec(function(err, eventObj) {
                         console.log(eventObj);
                         eventObj.bookings.push(savedBooking._id);
                         eventObj.save();
                     });
                });
            }
        }
    })
});

module.exports = {
    mutationType
};
