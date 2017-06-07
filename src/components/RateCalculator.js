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

  constructor() {
    super();
    // this.state = { rate: 0 };
  }

  /**
   * @method caclulates a rate based on passed in parameters and business logic
   * gets paid $12/hour from start-time to bedtime
   * gets paid $8/hour from bedtime to midnight
   * gets paid $16/hour from midnight to end of job
  */
    calculateRate = () => {
      const hourlyRates = {
        beforeBed: 12
      }
      const momentStartTime = new Moment.unix(this.props.startTime);
      const momentEndTime = new Moment.unix(this.props.endTime);
      const momentBedTime = new Moment.unix(this.props.bedTime);

      let runningTime = momentStartTime;
      let duration = new Moment.duration(momentEndTime.diff(momentStartTime));
      let hours = duration.asHours();

      let rate = 0;

      while (runningTime.isBefore(momentEndTime)) {
        rate += hourlyRates.beforeBed;

        runningTime.add(1, 'hours');
      }

      return rate;
      /*
      this.setState({
        rate: rate
      });
      */
    }

  componentWillUpdate = (nextProps, nextState) => {
/*
    let update = true;
    if (this.state.rate === nextState.rate) {
      update = false;
    }
    return update;
*/
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
