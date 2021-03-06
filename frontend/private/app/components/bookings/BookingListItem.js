import React, {PropTypes} from "react"
import {Row, Col, Button} from 'react-materialize';
import {connect} from "react-redux"
import {CollectionItem, Icon} from 'react-materialize';
import {Link} from 'react-router-dom';
import * as routes from '../../constants/routes';
import l10n from '../../l10n/localization';
import FixedActionButton from '../menu/FixedActionButton';
import * as actions from '../../actions/bookingsActions';
import moment from 'moment';
import {Preloader} from 'react-materialize';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Loader from "../utils/Loader";

const propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default class BookingListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeStatus(e) {
        e.preventDefault();
        this.props.dispatch(actions.changeStatus(this.props._id, this.props.event._id));
    }

    render() {
        return (
            <li style={{opacity: this.props.changingStatus ? 0.3 : 1}} className={"collection-item avatar unclickable "}>
                <div className="datetime-box booking circle">
                    <span className="month-day">{this.props.nbExpected}</span>
                    <span className="year">{l10n.fields.bookings.persons}</span>
                </div>

                <Link
                    to={l10n.formatString(routes.BOOKINGS_EDIT, this.props.event._id, this.props._id)}
                    href="#">
                    <h4>{this.props.lastName.toUpperCase()} {this.props.firstName}</h4>
                    <p>{moment(this.props.subscribeDate).format('D MMM YYYY à HH:mm')}</p>
                </Link>

                <div className="secondary-content">
                    {this.props.editLink &&
                    <li>
                        <a onClick={this.onChangeStatus.bind(this)}
                           className={"btn-floating btn-flat " + (this.props.showedUp ? 'green' : 'grey')}
                           to={l10n.formatString(routes.BOOKINGS_EDIT, this.props.event._id, this.props._id)}
                           href="#">
                            <Icon>check</Icon>
                        </a>
                    </li>
                    }
                </div>

            </li>
        );
    }
}

BookingListItem.propTypes = propTypes;
