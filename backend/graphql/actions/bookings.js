/*jshint esversion: 6 */
let models = require('../../entity/models');

function get(root, args) {
    let bookingId = args.bookingId;
    return new Promise((resolve, reject) => {
        models.booking.findById(bookingId, function (err, booking) {
            if (booking) {
                resolve(models.booking
                    .populate(booking, 'event')
                );
            }
            else {
                reject('Booking does not exist');
            }
        });
    });
}

function list(root, args) {
    let eventId = args.eventId;
    return models.booking
        .find()
        .sort({subscribeDate: 1})
        .populate('event');
}


function listForEvent(root, args) {
    let eventId = args.eventId;
    console.log("Return list of bookings for event " + eventId);

    return new Promise((resolve, reject) => {
        models.booking
            .find({event: eventId})
            .populate('event')
            .sort({subscribeDate: 1})
            .exec(function (err, bookings) {
                if (err) {
                    reject(err);
                }
                resolve(bookings);
            });
    });
}

function create(value, args) {
    return new Promise((resolve, reject) => {
        models.event.findOne({_id: args.booking.event}).exec(function (err, eventObj) {
            if (eventObj) {
                let booking = new models.booking(args.booking);
                booking.subscribeDate = new Date().toISOString();
                booking.save(function (err, savedBooking) {
                    if (err) {
                        console.error(err);
                        reject(err);
                    }
                    else {
                        console.log("Saved booking to DB");
                        resolve(booking);
                    }
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
                    resolve(models.event.populate(booking, 'event'));
                }
                else {
                    console.error(err);
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

function changeStatus(root, args) {
    let bookingId = args.bookingId;
    return new Promise((resolve, reject) => {
        models.booking.findById(args.bookingId, function (err, booking) {
            if (booking) {
                console.log('Changing status of booking ' + args.bookingId);
                models.booking.findById(bookingId, function(err, booking) {
                    models.booking.findByIdAndUpdate(
                        bookingId,
                        {showedUp: !booking.showedUp},
                        {new: true},
                        function (err, updatedBooking) {
                            console.log(updatedBooking);
                            resolve(updatedBooking);
                        });
                });
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
    listForEvent,
    create,
    edit,
    remove,
    changeStatus
};
