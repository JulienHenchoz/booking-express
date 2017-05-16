import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {Collection, Row} from 'react-materialize';
import {CSSTransition, transit} from "react-css-transition";
import Loader from '../utils/Loader';
import Reload from '../utils/Reload';
import l10n from "../../l10n/localization";
import * as routes from '../../constants/routes';
import moment from 'moment';
import HighlightBox from '../utils/HighlightBox';
import DateTimeBox from '../events/DateTimeBox';
import * as actions from '../../actions/eventsActions';
import * as bookingActions from '../../actions/bookingsActions';

import BookingListItem from './BookingListItem';
import FixedNavBar from '../menu/FixedNavBar';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool,
    error: PropTypes.string,
    active: PropTypes.bool
};

class BookingsList extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * When the component is loaded, automatically fetch bookings via AJAX
     */
    componentWillMount() {
        let eventId = this.props.match.params.eventId !== undefined ? this.props.match.params.eventId : null;
        if (eventId) {
            this.props.dispatch(actions.fetchEventWithBookings(eventId));
        }
    }

    componentWillUnmount() {
        this.props.dispatch(bookingActions.leaveBookingsList());
    }

    /**
     * Force reload of the current list
     * @param e
     */
    onReload(e) {
        e.preventDefault();
        this.props.dispatch(actions.fetchEventWithBookings(this.props.event._id));
    }

    /**
     * If AJAX returned no data, display a message + a reload button
     * @returns {XML}
     */
    getEmptyMessage() {
        if (this.isListEmpty() && !this.props.fetching) {
            return (
                <Reload onClick={this.onReload.bind(this)} error={l10n.no_bookings}/>
            );
        }
    }

    /**
     * Returns true if the items list is empty or undefined, else false
     * @returns {boolean}
     */
    isListEmpty() {
        return (!this.props.event
        || this.props.event.bookings === undefined
        || this.props.event.bookings === null
        || this.props.event.bookings.length === 0);
    }

    getOccupancyClass() {
        if (this.props.event.occupancyPercentage > 80) {
            return 'red-text';
        }
        else if (this.props.event.occupancyRate > 70) {
            return 'orange-text';
        }
        else {
            return 'green-text';
        }
    }

    getProgressBarClass() {
        if (this.props.event.occupancyPercentage > 80) {
            return 'green';
        }
        else if (this.props.event.occupancyPercentage > 70) {
            return 'orange';
        }
        else {
            return 'red';
        }
    }

    /**
     * General render method. Builds the list of bookings to display
     * @returns {XML}
     */
    render() {
        // Display the list
        var itemList = '';
        var self = this;
        if (!this.isListEmpty()) {
            itemList = this.props.event.bookings.map(function (booking) {
                console.log(booking);
                return (<BookingListItem dispatch={self.props.dispatch} event={self.props.event} editLink={true}
                                         key={booking._id} {...booking} />);
            });
        }

        let body = '';
        if (itemList.length) {
            body = (
                <div>
                    {itemList.length &&
                    <Collection>
                        {itemList}
                    </Collection>
                    }
                </div>
            );
        }

        return (
            <div className="bookings-page">
                <FixedNavBar
                    title={l10n.bookings_title}
                    showAddBtn={true}
                    addRoute={l10n.formatString(routes.BOOKINGS_ADD, this.props.event ? this.props.event._id : '')}
                    editRoute={l10n.formatString(routes.EVENTS_EDIT, this.props.event ? this.props.event._id : '')}
                />

                <div className="page">
                    {!this.props.fetchingEvent && this.props.event &&
                    <div>
                        <h1>
                            {this.props.event.name}
                            <small className="right">
                                <DateTimeBox className="circle" dateTime={this.props.event.startDate}/>
                            </small>
                        </h1>

                        <div className="progress grey lighten-3">
                            <div className={"determinate " + this.getProgressBarClass()}
                                 style={{width: this.props.fetching ? 0 : this.props.event.occupancyPercentage + "%"}}></div>
                        </div>

                        <Row>
                            <HighlightBox value={this.props.event.nbBookings} label={l10n.highlight_bookings}/>
                            <HighlightBox value={this.props.event.nbExpected} label={l10n.highlight_people}/>
                            <HighlightBox colorClassName={this.getOccupancyClass()} value={this.props.event.seatsLeft}
                                          label={l10n.hightlight_seats_left}/>
                        </Row>
                    </div>
                    }

                    {this.props.fetching &&
                    <Loader />
                    }

                    {this.props.error && !this.props.fetching &&
                    <Reload onClick={this.onReload.bind(this)} error={this.props.error}/>
                    }

                    {!this.props.fetching && this.props.event && this.isListEmpty() && !this.props.error &&
                    <Reload onClick={this.onReload.bind(this)} error={l10n.no_bookings}/>
                    }

                    {!this.props.fetching && !this.props.error &&
                    body
                    }
                </div>
            </div>
        )
    }
}

BookingsList.propTypes = propTypes;

export default connect((state) => {
    return Object.assign({}, {
        event: state.events.item,
        fetching: state.events.fetching,
        error: state.events.error,
        active: state.events.active,
    });
})(BookingsList);
