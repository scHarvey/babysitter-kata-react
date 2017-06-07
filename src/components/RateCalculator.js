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
      let partialHour = false;
      let rate = 0;

      let totalDuration = new Moment.duration(momentEndTime.diff(momentStartTime));
      const totalHours = totalDuration.asHours();
      if (totalHours < Math.round(totalHours)){
        partialHour = true;
      }
      let beforeBedDuration = new Moment.duration(momentBedTime.diff(momentStartTime));
      let beforeBedHours = Math.round(beforeBedDuration.asHours());
      if (beforeBedHours > totalHours) {
        beforeBedHours = Math.round(totalHours);
      } else if (beforeBedHours < 0) {
        beforeBedHours = 0;
      }

      let afterBedDuration = new Moment.duration(momentEndTime.diff(momentBedTime));
      let afterBedHours = Math.round(afterBedDuration.asHours());
      if (afterBedHours > totalHours) {
        afterBedHours = totalHours;
      }

      let afterMidnightDuration = new Moment.duration(momentEndTime.diff(Moment().startOf('day').hours(24)));
      let afterMidnightHours = Math.round(afterMidnightDuration.asHours());
      if (afterMidnightHours < 0) {
        afterMidnightHours = 0;
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
        <span className="currency_type">$</span>
        <span className="rate">{this.calculateRate()}</span>
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
