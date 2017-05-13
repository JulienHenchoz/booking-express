/*jshint esversion: 6 */
let models = require('../../entity/models');

function get() {
    return {
        _id: 1
    };
}

function list(root, args) {
    let eventId = args.eventId;
    console.log("Return list of bookings for event " + eventId);

    return models.booking
        .find({event: eventId})
        .populate('event');
}

function create(value, args) {
    return new Promise((resolve, reject) => {
        models.event.findOne({_id: args.booking.event}).exec(function (err, eventObj) {
            if (eventObj) {
                let booking = new models.booking(args.booking)
                booking.subscribeDate = new Date().getTime();
                booking.save(function (err, savedBooking) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        console.log("Saved booking to DB");
                    }
                    eventObj.bookings.push(savedBooking);
                    eventObj.save(function (err, savedEvent) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        else {
                            console.log("Added booking to event in DB");
                            resolve(models.booking.populate(savedBooking, 'event'));
                        }
                    });
                });
            }
            else {
                let error = 'Event does not exist ' + args.booking.event;
                console.log(error);
                reject(new Error(error));
            }
        });
    });
}

/**
 * Edit a booking
 * @param root
 * @param args
 * @returns {Promise}
 */
function edit(root, args) {
    return new Promise((resolve, reject) => {
        models.booking.findByIdAndUpdate(
            args.bookingId,
            args.booking,
            {new: true},
            function (err, booking) {
                if (booking) {
                    console.log('Edited booking ' + args.bookingId);
                    resolve(Event.populate(booking, 'event'));
                }
                else {
                    let error = 'Booking does not exist ' + args.bookingId;
                    console.log(error);
                    reject(new Error(error));
                }
            }
        );
    });
}

function remove(root, args) {
    return new Promise((resolve, reject) => {
        models.booking.findByIdAndRemove(args.bookingId, function (err, booking) {
            if (booking) {
                console.log('Removed booking ' + args.bookingId);
                resolve(models.booking.populate(booking, 'event'));
            }
            else {
                let error = 'Booking does not exist ' + args.bookingId;
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
