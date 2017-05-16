/*jshint esversion: 6 */
let models = require('../../entity/models');

function get(root, args) {
    return {
        latestBookings: getLatestBookings()
    };
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
