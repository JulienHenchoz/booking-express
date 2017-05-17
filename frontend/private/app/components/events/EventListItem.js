import React, {PropTypes} from "react"
import {Row, Col, Button} from 'react-materialize';
import {connect} from "react-redux"
import {CollectionItem, Icon} from 'react-materialize';
import {Link} from 'react-router-dom';
import * as routes from '../../constants/routes';
import l10n from '../../l10n/localization';
import DateTimeBox from './DateTimeBox';
import FixedActionButton from '../menu/FixedActionButton';
import * as actions from '../../actions/eventsActions';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    website: PropTypes.string,
    editLink: PropTypes.bool
};

class EventListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let image = <Icon className="large grey-text">event</Icon>
        if (this.props.image !== undefined && this.props.image) {
            image = <img className="circle responsive-img" src={this.props.image}/>;
        }

        return (
            <div className="collection-item avatar">

                <DateTimeBox className="circle" dateTime={this.props.startDate}/>

                <Link
                    to={l10n.formatString(routes.BOOKINGS_LIST, this.props._id)}
                    href="#">
                    <h4>{this.props.name}</h4>
                    <p>{this.props.venue.name}</p>
                </Link>

            </div>
        );
    }
}

EventListItem.propTypes = propTypes;

export default connect((store) => {
    return Object.assign({}, store.events);
})(EventListItem);
