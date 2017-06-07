import React from 'react';
import './RateKey.css';

/**
 * Simple Selector for Time
*/

class RateKey extends React.Component {
  render() {
    return(
      <div className="rate_key">
        <ul className="rate_rules">
          <li>$12/hour from start-time to bedtime</li>
          <li>$8/hour from bedtime to midnight</li>
          <li>$16/hour from midnight to end of job</li>
          <li>paid for full hours (no fractional hours)</li>
        </ul>
      </div>
    );
  }
}

export default RateKey;
