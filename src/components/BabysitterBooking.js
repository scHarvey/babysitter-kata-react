import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import './BabysitterBooking.css';
import TimePicker from './TimePicker';
import RateCalculator from './RateCalculator';


/**
 * Simple Representation of a Babysitter Booking Calculator
*/
class BabysitterBooking extends React.Component {

  static propTypes = {
    earliestStartTime: PropTypes.string,
    latestEndTime: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    bedTime: PropTypes.string
  }

  /**
   * @method sets up state with either default of passed in props
  */
  componentWillMount() {
    this.setState({
      st_validation: {
        code: 200,
        message: 'OK'
      },
      et_validation: {
        code: 200,
        message: 'OK'
      },
      startTime: this.props.startTime,
      endTime: this.props.endTime,
      bedTime: this.props.bedTime

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
    const momentStartTime = new Moment.unix(proposedStartTime);
    const momentEndTime = new Moment.unix(proposedEndTime);

    if (momentStartTime.isAfter(momentEndTime)) {
      st_validationMessage = {
        code: 400,
        message: 'Start Time can not be later than End Time.'
      };
      et_validationMessage = {
        code: 400,
        message: 'End Time can not be earlier than Start Time.'
      };
    } else {
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
    const endTime = this.state.endTime;
    this.validateBooking(startTime, endTime);

    // calculate wages
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
      }, function() {
        this.validateBooking(this.state.startTime, this.state.endTime);
      });
    } else if (stateVar === 'endTime') {
      this.setState({
        endTime: stateValue
      }, function() {
        this.validateBooking(this.state.startTime, this.state.endTime);
      });
    } else if (stateVar === 'bedTime') {
      this.setState({
        bedTime: stateValue
      });
    }

  }

  /**
   * @return {string} - HTML markup for the Babysitter Booking Calculator
  */
  render() {
    return (
      <div>
        <div className="booking_wrapper">
          <form onSubmit={this.handleSubmit} className="booking_form">
            <div className="time_picker">
              <TimePicker className="start_time_picker" label="Start Time" propClass="start_time_select" stateVar="startTime" defaultTime={this.state.startTime} callback={this.timePickerChange.bind(this)} />
              <span className={`start_time time_validation tv_${this.state.st_validation.code}`}></span>
            </div>
            <div className="time_picker">
              <TimePicker className="end_time_picker" label="End Time" propClass="end_time_select" stateVar="endTime" defaultTime={this.state.endTime} callback={this.timePickerChange.bind(this)} />
              <span className={`end_time time_validation tv_${this.state.et_validation.code}`}></span>
            </div>
            <div className="time_picker">
              <TimePicker className="bed_time_picker" label="Bed Time" propClass="bed_time_select" stateVar="bedTime" defaultTime={this.state.bedTime} callback={this.timePickerChange.bind(this)} />
              <span className="time_validation bed_time_validation"></span>
            </div>
          </form>
        </div>
        <div className={`booking_wrapper rate_calculator_wrapper tv_${this.state.st_validation.code} tv_${this.state.et_validation.code}`}>
          <RateCalculator startTime={this.state.startTime} endTime={this.state.endTime} bedTime={this.state.bedTime} />
        </div>
      </div>

    );
  }
}

BabysitterBooking.defaultProps = {
  earliestStartTime: new Moment().startOf('day').hour(17).minute(0).format('X'),
  latestEndTime: new Moment().startOf('day').hour(28).minute(0).format('X'),
  startTime: new Moment().startOf('day').hour(17).minute(0).format('X'),
  endTime: new Moment().startOf('day').hour(21).minute(0).format('X'),
  bedTime: new Moment().startOf('day').hour(20).minute(0).format('X')
};

export default BabysitterBooking;
