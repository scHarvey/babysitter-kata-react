import React from 'react';
import PropTypes from 'prop-types';

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
    startTime: PropTypes.shape({
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
      validation: {
        code: 0,
        message: 'OK'
      }
    };
  }

  /**
   * Validates a Booking.
   * @method
   * @param {object} proposedStartTime - An object represention of the booking startTime
   * @returns {object} response - An object with a code and a message.
   * example: { code: '200', message: 'OK' }
  */
  validateBooking = (proposedStartTime) => {
    let validationMessage = {};
    if (this.validDateStartTime(proposedStartTime)) {
      validationMessage = {
        code: 200,
        message: 'OK'
      };
    } else {
      validationMessage = {
        code: 400,
        message: 'Start time is earlier than the allowed time.'
      };
    }
    return validationMessage;
  }

  /**
   * Makes sure that a propsed booking meets the house rules for start time.
   * @method
   * @param {object} proposedStartTime - An object represention of a startTime
   * @returns {object} boolean - True if valid | False if invalid.
  */
  validDateStartTime = (proposedStartTime) => {
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
   * Routes our form's submit button to the proper methods
   * @method
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const startTime = this.props.startTime;
    const validation_msg = this.validateBooking(startTime);
    this.setState({
      validation: {
        code: validation_msg.code,
        message: validation_msg.message
      }
    });
  }

  /**
   * @return {string} - HTML markup for the Babysitter Booking Calculator
  */
  render() {
    return (
        <div className="booking_wrapper">
          <div className="validation_message">{this.state.validation.message}</div>
          <form onSubmit={this.handleSubmit} className="booking_form">
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
  startTime: {
    hour: 4,
    minutes: 0,
    period: 'PM'
  }
}

export default BabysitterBooking;
