import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import TimePicker from './TimePicker';


/**
 * Simple Representation of a Babysitter Booking Calculator
*/
class BabysitterBooking extends React.Component {

  static propTypes = {
    earliestStartTime: PropTypes.string,
    latestEndTime: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string
  }

  /**
   * @method sets up state with either default of passed in props
  */
  componentWillMount() {
    this.setState({
      st_validation: {
        code: 0,
        message: 'OK'
      },
      et_validation: {
        code: 0,
        message: 'OK'
      },
      startTime: this.props.startTime,
      endTime: this.props.endTime
    });
  }
  /**
   * Validates a Booking.
   * @method
   * @param {string} proposedStartTime - A string represention of the booking startTime
   * @param {string} proposedEndTime - A string representation of the booking endTime
  */
  validateBooking = (proposedStartTime, proposedEndTime) => {
    let st_validationMessage = {};
    let et_validationMessage = {};

    if (this.validateStartTime(proposedStartTime)) {
      st_validationMessage = {
        code: 200,
        message: 'OK'
      };
    } else {
      st_validationMessage = {
        code: 400,
        message: 'Start time is earlier than the allowed time.'
      };
    }

    if (this.validateEndTime(proposedEndTime)) {
      et_validationMessage = {
        code: 200,
        message: 'OK'
      };
    } else {
      et_validationMessage = {
        code: 400,
        message: 'End time is later than the allowed time.'
      };
    }


    this.setState({
      st_validation: {
        code: st_validationMessage.code,
        message: st_validationMessage.message
      },
      et_validation: {
        code: et_validationMessage.code,
        message: et_validationMessage.message
      }
    });
  }

  /**
   * Makes sure that a proposed booking meets the house rules for start time.
   * @method
   * @param {string} proposedStartTime - A string represention of a startTime
   * @returns {boolean} True if valid | False if invalid.
  */
  validateStartTime = (proposedStartTime) => {
    let validStartTime = false;
    const momentStartTime = new Moment.unix(proposedStartTime);
    const momentEarliestStartTime = new Moment.unix(this.props.earliestStartTime);
    const momentLatestEndTime = new Moment.unix(this.props.latestEndTime);
    if (momentStartTime.isSameOrAfter(momentEarliestStartTime) && momentStartTime.isBefore(momentLatestEndTime)) {
      validStartTime = true;
    }

    return validStartTime;
  }

  /**
   * Makes sure that a proposed booking meets the house rules for end time.
   * @method
   * @param {momentString} proposedEndTime - A object represention of a endTime
   * @returns {boolean} True if valid | False if invalid.
  */
  validateEndTime = (proposedEndTime) => {
    let validEndTime = false;
    const momentEndTime = new Moment.unix(proposedEndTime);
    const momentLatestEndTime = new Moment.unix(this.props.latestEndTime);
    const momentEarliestStartTime = new Moment.unix(this.props.earliestStartTime);

    if (momentEndTime.isSameOrBefore(momentLatestEndTime) && momentEndTime.isAfter(momentEarliestStartTime)) {
      validEndTime = true;
    }
    return validEndTime;
  }

  /**
   * Routes our form's submit button to the proper methods
   * @method
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const startTime = this.state.startTime;
    const endTime = this.props.endTime;
    this.validateBooking(startTime, endTime);
  }

  /**
   * Handles the onChange event for our timePickers
   * This isn't ideal as this function is now dependant on the child component
   * May look into Redux for state management in a later version
   * @method
   * @param {string} stateVar - which state var should we update
   * @returns {object} stateValue - time object.
  */
  timePickerChange = (stateVar, stateValue) => {
    if (stateVar === 'startTime') {
      this.setState({
        startTime: stateValue
      });
    } else if (stateVar === 'endTime') {
      this.setState({
        endTime: stateValue
      });
    }
  }

  /**
   * @return {string} - HTML markup for the Babysitter Booking Calculator
  */
  render() {
    return (
      <div className="booking_wrapper">
        <div className="st_validation_message">{this.state.st_validation.message}</div>
        <div className="et_validation_message">{this.state.et_validation.message}</div>
        <form onSubmit={this.handleSubmit} className="booking_form">
          <TimePicker className="start_time_picker" label="Start Time" propClass="start_time_select" stateVar="startTime" defaultTime={this.state.startTime} callback={this.timePickerChange.bind(this)} />
          <TimePicker className="end_time_picker" label="End Time" propClass="end_time_select" stateVar="endTime" defaultTime={this.state.endTime} callback={this.timePickerChange.bind(this)} />
          <input type="submit" className="submit_button" value="Submit Booking" />
        </form>
      </div>
    );
  }
}

BabysitterBooking.defaultProps = {
  earliestStartTime: new Moment().startOf('day').hour(17).minute(0).format('X'),
  latestEndTime: new Moment().startOf('day').hour(28).minute(0).format('X'),
  startTime: new Moment().startOf('day').hour(17).minute(0).format('X'),
  endTime: new Moment().startOf('day').hour(21).minute(0).format('X')
};

export default BabysitterBooking;
