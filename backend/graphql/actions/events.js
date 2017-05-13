/*jshint esversion: 6 */
let mongoose = require('mongoose');
let models = require('../../entity/models');

function list() {
    console.log("Return list of events");
    return models.event
        .find()
        .populate('venue')
        .populate('bookings');
}

function get(root, args) {
    let eventId = args.eventId;
    return new Promise((resolve, reject) => {
        models.event.findById(eventId, function (err, event) {
            if (event) {
                resolve(models.event
                    .populate(event, 'bookings venue')
                );
            }
            else {
                reject('Event does not exist');
            }
        });
    });
}

function create(value, args) {
    return new Promise((resolve, reject) => {
        models.venue.findOne({_id: args.event.venue}).exec(function (err, venueObj) {
            if (venueObj) {
                let event = new models.event(args.event);
                event.save(function (err, savedEvent) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        console.log("Saved event to DB");
                    }
                    venueObj.events.push(savedEvent);
                    venueObj.save(function (err, savedVenue) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            console.log("Added event to venue in DB");
                            console.log(savedEvent);
                            resolve(models.event.populate(savedEvent, 'venue'));
                        }
                    });
                });
            }
            else {
                let error = 'Venue does not exist ' + args.event.venue;
                console.log(error);
                reject(new Error(error));
            }
        });
    });
}

/**
 * Edit an event
 * @param root
 * @param args
 * @returns {Promise}
 */
function edit(root, args) {
    return new Promise((resolve, reject) => {
        models.event.findByIdAndUpdate(
            args.eventId,
            args.event,
            {new: true},
            function (err, event) {
                if (event) {
                    console.log('Edited event ' + args.eventId);
                    resolve(models.event.populate(event, 'venue'));
                }
                else {
                    let error = 'Event does not exist ' + args.eventId;
                    console.log(error);
                    reject(new Error(error));
                }
            }
        );
    });
}

function remove(root, args) {
    return new Promise((resolve, reject) => {
        models.event.findByIdAndRemove(args.eventId, function (err, event) {
            if (event) {
                console.log('Removed event ' + args.eventId);
                resolve(models.booking.populate(event, 'venue bookings'));
            }
            else {
                let error = 'Event does not exist ' + args.eventId;
                console.log(error);
                reject(new Error(error));
            }
        });
    });
}

module.exports = {
    get,
    list,
    create,
    edit,
    remove
};
