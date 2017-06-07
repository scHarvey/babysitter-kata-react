import React from 'react';
import './RateKey.css';

/**
 * Simple Selector for Time
*/

class RateKey extends React.Component {
  render() {
    return(
      <div className="rate_key">
        <table className="rate_rules">
          <tbody>
            <tr>
              <td className="rate_amounts">$</td>
              <td className="rate_amounts">12</td>
              <td>per hour from start time to bedtime</td>
            </tr>
            <tr>
              <td className="rate_amounts">$</td>
              <td className="rate_amounts">8</td>
              <td>per hour from bedtime to midnight</td>
            </tr>
            <tr>
              <td className="rate_amounts">$</td>
              <td className="rate_amounts">16</td>
              <td>per hour from midnight to end of job</td>
            </tr>
            <tr>
              <td className="rate_amounts"></td>
              <td className="rate_amounts">*</td>
              <td>fractional hours are rounded up</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RateKey;
