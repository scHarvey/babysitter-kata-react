import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

/**
 * Turns our time variables into a nightly rate.
*/
class RateCalculator extends React.Component {
  static propTypes = {
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    bedTime: PropTypes.string
  }

  /**
   * @method caclulates a rate based on passed in parameters and business logic
   * gets paid $12/hour from start-time to bedtime
   * gets paid $8/hour from bedtime to midnight
   * gets paid $16/hour from midnight to end of job
   * gets paid for full hours (no fractional hours)
  */
    calculateRate = () => {
      const hourlyRates = {
        beforeBed: 12,
        afterBed: 8,
        afterMidnight: 16
      }
      const momentStartTime = new Moment.unix(this.props.startTime);
      const momentEndTime = new Moment.unix(this.props.endTime);
      const momentBedTime = new Moment.unix(this.props.bedTime);
      let requiresRounding = false;
      let rate = 0;
      let beforeBedDuration = null;
      let beforeBedHours = 0;
      let afterBedDuration = null;
      let afterBedHours = 0;
      let afterMidnightDuration = null;
      let afterMidnightHours = 0;

      let totalDuration = new Moment.duration(momentEndTime.diff(momentStartTime));
      const totalHours = totalDuration.asHours();
      if (totalHours < Math.round(totalHours)) {
        requiresRounding = true;
      }

      if (requiresRounding) {
        beforeBedDuration = new Moment.duration(momentBedTime.diff(momentStartTime));
        beforeBedHours = Math.round(beforeBedDuration.asHours());
        if (beforeBedHours > totalHours) {
          beforeBedHours = Math.round(totalHours);
        } else if (beforeBedHours < 0) {
          beforeBedHours = 0;
        }

        afterBedDuration = new Moment.duration(momentEndTime.diff(momentBedTime));
        afterBedHours = Math.round(afterBedDuration.asHours());
        if (afterBedHours > totalHours) {
          afterBedHours = totalHours;
        }

        afterMidnightDuration = new Moment.duration(momentEndTime.diff(Moment().startOf('day').hours(24)));
        afterMidnightHours = Math.round(afterMidnightDuration.asHours());
        if (afterMidnightHours < 0) {
          afterMidnightHours = 0;
        }
      } else {
        beforeBedDuration = new Moment.duration(momentBedTime.diff(momentStartTime));
        beforeBedHours = beforeBedDuration.asHours();
        if (beforeBedHours > totalHours) {
          beforeBedHours = totalHours;
        } else if (beforeBedHours < 0) {
          beforeBedHours = 0;
        }

        afterBedDuration = new Moment.duration(momentEndTime.diff(momentBedTime));
        afterBedHours = afterBedDuration.asHours();
        if (afterBedHours > totalHours) {
          afterBedHours = totalHours;
        }

        afterMidnightDuration = new Moment.duration(momentEndTime.diff(Moment().startOf('day').hours(24)));
        afterMidnightHours = afterMidnightDuration.asHours();
        if (afterMidnightHours < 0) {
          afterMidnightHours = 0;
        }
      }

      rate = (beforeBedHours * hourlyRates.beforeBed);
      rate += ((afterBedHours-afterMidnightHours) * hourlyRates.afterBed);
      rate += (afterMidnightHours * hourlyRates.afterMidnight);
      // console.log('Before Bed Hours: ' + beforeBedHours);
      // console.log('After Bed Hours: ' + afterBedHours);
      // console.log('After Midnight Hours: ' + afterMidnightHours);
      // console.log(beforeBedHours + ' * ' + hourlyRates.beforeBed + ' + ' + '( ' + afterBedHours + ' - ' + afterMidnightHours + ' ) * ' + hourlyRates.afterBed + ' + ' + afterMidnightHours + ' * ' + hourlyRates.afterMidnight + ' = ' + rate);

      return rate;
    }

  /**
   * @return {string} - HTML markup for a TimePicker
  */
  render() {
    return (
      <div>
        <span className="rate_label">Rate for this booking:  $<span className="rate">{this.calculateRate()}</span></span>
        <span className="rate_error_label">This is an invalid Booking.</span>
      </div>
    );
  }
};

RateCalculator.defaultProps = {
  startTime: new Moment().startOf('day').hour(17).minute(0).format('X'),
  endTime: new Moment().startOf('day').hour(21).minute(0).format('X'),
  bedTime: new Moment().startOf('day').hour(20).minute(0).format('X')
};

export default RateCalculator;
