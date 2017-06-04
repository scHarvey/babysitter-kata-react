import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

/* Time Picker Setup */
const format = 'h:mm a';

/**
 * Simple Representation of a Babysitter Booking Calculator
 * @constructor
*/
class BabysitterBooking extends React.Component {

  static propTypes = {
    earliestStartTime: PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.number,
      period: PropTypes.string
    }),
    latestEndTime: PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.number,
      period: PropTypes.string
    }),
    startTime: PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.number,
      period: PropTypes.string
    }),
    endTime: PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.number,
      period: PropTypes.string
    })
  }

  /**
   * Constructor method to set up base state
  */
  constructor() {
    super();
    this.state = {
      st_validation: {
        code: 0,
        message: 'OK'
      },
      et_validation: {
        code: 0,
        message: 'OK'
      },
      startTime: {
        hour: 0,
        minutes: 0,
        period: ''
      }
    }
  }

  componentWillMount() {
    this.setState({
      startTime: {
        hour: this.props.startTime.hour,
        minutes: this.props.startTime.minutes,
        period: this.props.startTime.period
      }
    });
  }

  /**
   * Validates a Booking.
   * @method
   * @param {object} proposedStartTime - An object represention of the booking startTime
   * @param {object} proposedEndTime - An object representation of the booking endTime
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
   * @param {object} proposedStartTime - An object represention of a startTime
   * @returns {object} boolean - True if valid | False if invalid.
  */
  validateStartTime = (proposedStartTime) => {
    const est = this.props.earliestStartTime;
    let validStartTime = false;
    // in our simple case start time is always PM, so an AM end time indicates the next day
    if (est.period === 'PM' && proposedStartTime.period === 'AM') {
      validStartTime = true;
    } else if (est.hour < proposedStartTime.hour) {
      validStartTime = true;
    } else if (est.hour === proposedStartTime.hour && est.minutes <= proposedStartTime.minutes) {
      validStartTime = true;
    } else {
      validStartTime = false;
    }
    return validStartTime;
  }

  /**
   * Makes sure that a proposed booking meets the house rules for end time.
   * @method
   * @param {object} proposedEndTime - An object represention of a endTime
   * @returns {object} boolean - True if valid | False if invalid.
  */
  validateEndTime = (proposedEndTime) => {
    const latestEndTime = this.props.latestEndTime;
    let validEndTime = false;
    if (latestEndTime.hour > proposedEndTime.hour) {
      validEndTime = true;
    } else if (latestEndTime.hour === proposedEndTime.hour && latestEndTime.minutes >= proposedEndTime.minutes) {
      validEndTime = true;
    } else if (proposedEndTime.period === 'PM') {
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
    console.log(startTime);
    this.validateBooking(startTime, endTime);
  }

  startTimePickerChange = (value) => {
    this.setState({
      startTime: {
        hour: value.format('h'),
        minutes: value.format('m'),
        period: value.format('A')
      }
    });
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
          <div>Start Time :
            <TimePicker
              className="startTimePicker"
              showSecond={false}
              onChange={this.startTimePickerChange}
              format={format}
              use12Hours
            />
          </div>
          <input type="submit" className="submit_button" value="Submit Booking" />
        </form>
      </div>
    );
  }
}

BabysitterBooking.defaultProps = {
  earliestStartTime: {
    hour: 5,
    minutes: 0,
    period: 'PM'
  },
  latestEndTime: {
    hour: 4,
    minutes: 0,
    period: 'AM'
  },
  startTime: {
    hour: 5,
    minutes: 0,
    period: 'PM'
  },
  endTime: {
    hour: 6,
    minutes: 0,
    period: 'PM'
  }
}

export default BabysitterBooking;
