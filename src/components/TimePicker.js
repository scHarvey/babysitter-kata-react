import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import './TimePicker.css';

/**
 * Simple Selector for Time
*/
class TimePicker extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    stateVar: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    propClass: PropTypes.string.isRequired,
    defaultTime: PropTypes.string.isRequired
  }

  constructor() {
    super();
    this.state = { selectedTime: '' };
  }

  /**
   * @method sets up state with either default of passed in props
  */
  componentWillMount() {
    if (this.state.selectedTime === '') {
      this.setState({
        selectedTime: this.props.defaultTime
      });
    }
  }

  /**
   * Builds a Time Selector's Options
   * @method
  */
  timeOptions = () => {
    const options = [];
    const optionsTimes = [];
    let optionsCount = 0;
    let dayReference = '';


    while (optionsCount < 57) {
      if (optionsCount < 48) {
        dayReference = 'Today';
      } else {
        dayReference = 'Tomorrow';
      }
      optionsTimes[optionsCount] = new Moment().startOf('day').minutes(30 * optionsCount);
      options[optionsCount] = <option key={optionsCount} value={optionsTimes[optionsCount].format('X')}>{`${dayReference} ${optionsTimes[optionsCount].format('h:mm A')}`}</option>;
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
    const userSelectedTime = e.target.value;

    this.setState({
      selectedTime: userSelectedTime
    }, function() {
      this.props.callback(this.props.stateVar, this.state.selectedTime);
    });
  }

  /**
   * @return {string} - HTML markup for a TimePicker
  */
  render() {
    return (
      <div className="time_picker_wrapper">
        <label htmlFor="timepicker">{this.props.label} : </label>
        <select name={this.props.stateVar} value={this.state.selectedTime} className={this.props.propClass} onChange={this.timeChange}>
          {this.timeOptions()}
        </select>
      </div>
    );
  }
};


export default TimePicker;
