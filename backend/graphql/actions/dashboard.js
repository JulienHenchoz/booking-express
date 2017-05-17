/*jshint esversion: 6 */
let models = require('../../entity/models');

function get(root, args) {
    console.log("Returning dashboard");
    return {
        latestBookings: getLatestBookings(),
        incomingEvents: getIncomingEventsCount(),
        totalBookings: getTotalBookingsCount(),
        totalPersons: getTotalPersonCount(),
    };
}

function getTotalPersonCount() {
    return new Promise((resolve, reject) => {
        // Fetch all the incoming events
        models.booking
            .find()
            .populate('event')
            .exec((err, bookings) => {
                if (err) {
                    reject(err);
                }
                let expectedPersons = 0;
                bookings.map((item) => {
                    if (item.event.startDate > new Date().toISOString()) {
                        expectedPersons += item.nbExpected;
                    }
                });
                resolve(expectedPersons);
            });
    });
}

function getTotalBookingsCount() {
    return new Promise((resolve, reject) => {
        // Fetch all the incoming events
        models.booking
            .find()
            .populate('event')
            .exec((err, bookings) => {
                if (err) {
                    reject(err);
                }
                let futureBookings = bookings.map((item) => {
                    if (item.event.startDate > new Date().toISOString()) {
                        return item;
                    }
                });
                resolve(futureBookings.length);
            });
    });
}

function getIncomingEventsCount() {
    return models.event
        .find({startDate: {$gt: new Date().toISOString()}})
        .count();

}

function getLatestBookings() {
    return models.booking
        .find()
        .sort('-subscribeDate')
        .limit(5)
        .populate('event');
}


module.exports = {
    get
};
