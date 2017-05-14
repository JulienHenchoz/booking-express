/*jshint esversion: 6 */
let models = require('../../entity/models');

function get(root, args) {
    let venueId = args.venueId;
    return new Promise((resolve, reject) => {
        models.venue.findById(venueId, function (err, venue) {
            if (venue) {
                resolve(models.venue
                    .populate(venue, 'events')
                );
            }
            else {
                reject('Venue does not exist');
            }
        });
    });
}

function list() {
    console.log("Return list of venues");

    return models.venue
        .find()
        .populate({
            path: 'events',
            populate: {
                path: 'bookings',
            }
        });
}


/**
 * Create a new venue
 * @param value
 * @param args
 */
function create(value, args) {
    console.log('Inserted venue in DB');
    let venue = new models.venue(args.venue);
    return venue.save();
}

/**
 * Edit a venue
 * @param root
 * @param args
 * @returns {Promise}
 */
function edit(root, args) {
    return new Promise((resolve, reject) => {
        models.venue.findByIdAndUpdate(
            args.venueId,
            args.venue,
            {new: true},
            function (err, venue) {
                if (venue) {
                    console.log('Edited venue ' + args.venueId);
                    resolve(models.venue.populate(venue, 'events'));
                }
                else {
                    let error = 'Venue does not exist ' + args.venueId;
                    console.log(error);
                    reject(new Error(error));
                }
            }
        );
    });
}

/**
 * Remove a venue
 * @param root
 * @param args
 * @returns {Promise}
 */
function remove(root, args) {
    return new Promise((resolve, reject) => {
        models.venue.findByIdAndRemove(args.venueId, function (err, venue) {
            if (venue) {
                console.log('Removed venue ' + args.venueId);
                resolve(models.venue.populate(venue, 'events'));
            }
            else {
                let error = 'Venue does not exist ' + args.venueId;
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
