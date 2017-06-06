import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import MomentPropTypes from 'react-moment-proptypes';

/**
 * Simple Selector for Time
*/
class TimePicker extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    stateVar: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    propClass: PropTypes.string.isRequired,
    defaultTime: MomentPropTypes.momentObj.isRequired
  }

  /**
   * @method sets up state with either default of passed in props
  */
  componentWillMount() {
    this.setState({
      selectedTime: this.props.defaultTime
    });
  }

  /**
   * @method sets up state with either default of passed in props
  */
  componentWillReceiveProps() {
    this.setState({
      selectedTime: this.props.defaultTime
    });
  }
  
  /**
   * Builds a Time Selector's Options
   * @method
  */
  timeOptions = () => {
    const options = [];
    let optionsCount = 0;
    const optionsTimes = [];

    while (optionsCount < 47) {
      optionsTimes[optionsCount] = new Moment().startOf('day').minutes(30 * optionsCount);
      options[optionsCount] = <option key={optionsCount} value={optionsTimes[optionsCount]}>{optionsTimes[optionsCount].format('h:mm A')}</option>;
      optionsCount += 1;
      optionsTimes[optionsCount] = new Moment().startOf('day').minutes(30 * optionsCount);
      options[optionsCount] = <option key={optionsCount} value={optionsTimes[optionsCount]}>{optionsTimes[optionsCount].format('h:mm A')}</option>;
      optionsCount += 1;
    }
    return options;
  }

  /**
   * Handles change events for our TimePicker and passes data back to the parent
   * @method
   * @param {string} value - A parsable string representation of our time object.
  */
  timeChange = (e) => {
    const selectedTime = new Moment(e.target.value);
    this.setState({
      selectedTime: selectedTime
    });

    this.props.callback(this.props.stateVar, selectedTime);
  }

  /**
   * @return {string} - HTML markup for a TimePicker
  */
  render() {
    return (
      <div>
        <div>
          <label htmlFor="timepicker">{this.props.label} : </label>
          <select name={this.props.stateVar} value={`${this.state.selectedTime}`} className={this.props.propClass} onChange={this.timeChange}>
            {this.timeOptions()}
          </select>
        </div>
      </div>
    );
  }
};


export default TimePicker;
