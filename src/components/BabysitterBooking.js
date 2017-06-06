import React from 'react';
import Moment from 'moment';
import MomentPropTypes from 'react-moment-proptypes';
import TimePicker from './TimePicker';


/**
 * Simple Representation of a Babysitter Booking Calculator
*/
class BabysitterBooking extends React.Component {

  static propTypes = {
    earliestStartTime: MomentPropTypes.momentObj,
    latestEndTime: MomentPropTypes.momentObj,
    startTime: MomentPropTypes.momentObj,
    endTime: MomentPropTypes.momentObj
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
   * @param {momentObj} proposedStartTime - An object represention of the booking startTime
   * @param {momentObj} proposedEndTime - An object representation of the booking endTime
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
   * @param {momentObj} proposedStartTime - An object represention of a startTime
   * @returns {boolean} True if valid | False if invalid.
  */
  validateStartTime = (proposedStartTime) => {
    let validStartTime = false;

    if (proposedStartTime.isSameOrAfter(this.props.earliestStartTime) && proposedStartTime.isBefore(this.props.latestEndTime)) {
      validStartTime = true;
    }

    return validStartTime;
  }

  /**
   * Makes sure that a proposed booking meets the house rules for end time.
   * @method
   * @param {momentObj} proposedEndTime - An object represention of a endTime
   * @returns {boolean} True if valid | False if invalid.
  */
  validateEndTime = (proposedEndTime) => {
    let validEndTime = false;

    if (proposedEndTime.isSameOrBefore(this.props.latestEndTime) && proposedEndTime.isAfter(this.props.earliestStartTime)) {
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
          <TimePicker className="start_time_picker" label="Start Time" propClass="start_time_select" stateVar="startTime" defaultTime={this.props.startTime} callback={this.timePickerChange.bind(this)} />
          <TimePicker className="end_time_picker" label="End Time" propClass="end_time_select" stateVar="endTime" defaultTime={this.props.endTime} callback={this.timePickerChange.bind(this)} />
          <input type="submit" className="submit_button" value="Submit Booking" />
        </form>
      </div>
    );
  }
}

BabysitterBooking.defaultProps = {
  earliestStartTime: Moment().startOf('day').hour(17).minute(0),
  latestEndTime: Moment().startOf('day').hour(28).minute(0),
  startTime: Moment().startOf('day').hour(17).minute(0),
  endTime: Moment().startOf('day').hour(21).minute(0)
};

export default BabysitterBooking;
