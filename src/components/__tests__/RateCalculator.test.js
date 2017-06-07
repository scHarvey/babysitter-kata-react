'use strict';

jest.dontMock('../RateCalculator');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Moment from 'moment';
import RateCalculator from '../RateCalculator';

/*
gets paid $12/hour from start-time to bedtime
gets paid $8/hour from bedtime to midnight
gets paid $16/hour from midnight to end of job
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
});
