'use strict';

jest.dontMock('../RateCalculator');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Moment from 'moment';
import RateCalculator from '../RateCalculator';

/* Rules:
* gets paid $12/hour from start-time to bedtime
* gets paid $8/hour from bedtime to midnight
* gets paid $16/hour from midnight to end of job
* gets paid for full hours (no fractional hours)
*/

describe('Rate Calculator', () => {
  it('it calculates rate correctly for 2 hours when bed time = end time and is before midnight.', () => {
    const startTime = new Moment().startOf('day').hour(16).minute(30).format('X');
    const endTime = new Moment().startOf('day').hour(18).minute(30).format('X');
    const bedTime = new Moment().startOf('day').hour(18).minute(30).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('24');
  });

  it('it calculates rate correctly for 3 hours with 1 hour of post bedtime but end time is before midnight.', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(0).format('X');
    const endTime = new Moment().startOf('day').hour(20).minute(0).format('X');
    const bedTime = new Moment().startOf('day').hour(19).minute(0).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('32');
  });

  it('it calculates rate correctly for 6 hours with 3 hour of post bedtime and 2 hours after midnight.', () => {
    const startTime = new Moment().startOf('day').hour(20).minute(0).format('X');
    const endTime = new Moment().startOf('day').hour(26).minute(0).format('X');
    const bedTime = new Moment().startOf('day').hour(21).minute(0).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('68');
  });

  it('it calculates rate correctly for 3 hours all before midnight and all after bedTime.', () => {
    const startTime = new Moment().startOf('day').hour(20).minute(0).format('X');
    const endTime = new Moment().startOf('day').hour(23).minute(0).format('X');
    const bedTime = new Moment().startOf('day').hour(20).minute(0).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('24');
  });

  it('it calculates rate correctly for 3 hours all after midnight and all after bedTime.', () => {
    const startTime = new Moment().startOf('day').hour(24).minute(0).format('X');
    const endTime = new Moment().startOf('day').hour(27).minute(0).format('X');
    const bedTime = new Moment().startOf('day').hour(20).minute(0).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('48');
  });

  it('it calculates rate correctly for 3.5 hours before bedtime and midnight.', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(0).format('X');
    const endTime = new Moment().startOf('day').hour(20).minute(30).format('X');
    const bedTime = new Moment().startOf('day').hour(20).minute(30).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('48');
  });

  it('it calculates rate correctly for 3.5 hours with 1 of those after bedtime but before midnight.', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(0).format('X');
    const endTime = new Moment().startOf('day').hour(20).minute(30).format('X');
    const bedTime = new Moment().startOf('day').hour(19).minute(30).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('44');
  });

  it('it calculates rate correctly for 4.5 hours with 1 of those after bedtime and 2 another midnight.', () => {
    const startTime = new Moment().startOf('day').hour(20).minute(30).format('X');
    const endTime = new Moment().startOf('day').hour(25).minute(0).format('X');
    const bedTime = new Moment().startOf('day').hour(23).minute(0).format('X');

    const rateCalculator = ReactTestUtils.renderIntoDocument(<RateCalculator startTime={startTime} endTime={endTime} bedTime={bedTime} />);

    const rate = ReactTestUtils.findRenderedDOMComponentWithClass(rateCalculator, 'rate');

    expect(rate.textContent).toEqual('60');
  });
});
