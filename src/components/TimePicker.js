import React from 'react';
import PropTypes from 'prop-types';

/**
 * Simple Selector for Time
*/
class TimePicker extends React.Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    stateVar: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    propClass: PropTypes.string.isRequired,
    defaultTime: PropTypes.shape({
      hour: PropTypes.number,
      minutes: PropTypes.number,
      period: PropTypes.string
    }).isRequired,
    color: PropTypes.string
  }

  /**
   * Builds a Time Selector's Options
   * @method
  */
  timeOptions = () => {
    const options = [];
    let optionsCount = 0;
    let hour = 0;
    let period = '';

    for (let i = 0; i < 24; i += 1) {
      if (i === 0) {
        hour = 12;
        period = 'AM';
      } else if (i < 12) {
        hour = i;
        period = 'AM';
      } else if (i === 12) {
        hour = i;
        period = 'PM';
      } else {
        hour = i - 12;
        period = 'PM';
      }

      options[optionsCount] = <option key={optionsCount} value={`${hour}|0|${period}`}>{hour}:00 {period}</option>;
      optionsCount += 1;
      options[optionsCount] = <option key={optionsCount} value={`${hour}|30|${period}`}>{hour}:30 {period}</option>;
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
    const selectValue = e.target.value.split('|');
    const selectedTime = {
      hour: Number.parseInt(selectValue[0], 10),
      minutes: Number.parseInt(selectValue[1], 10),
      period: selectValue[2]
    };

    this.props.callback(this.props.stateVar, selectedTime);
  }

  /**
   * @return {string} - HTML markup for a TimePicker
  */
  render() {
    return (
      <div className="form-group">
        <label htmlFor="timepicker" className="col-sm-2 control-label">{this.props.label}</label>
        <div className="col-sm-10">
          <select name={this.props.stateVar} value={`${this.props.defaultTime.hour}|${this.props.defaultTime.minutes}|${this.props.defaultTime.period}`} className={this.props.propClass} onChange={this.timeChange}>
            {this.timeOptions()}
          </select>
        </div>
      </div>
    );
  }
};

TimePicker.defaultProps = {
  color: 'green'
}
export default TimePicker;
