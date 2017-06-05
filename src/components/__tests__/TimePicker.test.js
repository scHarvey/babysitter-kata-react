'use strict';

jest.dontMock('../TimePicker');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import BabysitterBooking from '../BabysitterBooking';

describe('Selected TimePicker for StartTime', () => {

  it('sets state.startTime to {hour:5, minutes:30, period:"PM"} when 5:30PM is selected', () => {
    const testTime = {
      hour: 5,
      minutes: 30,
      period: "PM"
    };
    const testTimeString = `${testTime.hour}|${testTime.minutes}|${testTime.period}`;

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking />);
    const select = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'start_time_select');

    ReactTestUtils.Simulate.change(select, { target: { value: testTimeString } });
    const startTime = booking.state.startTime;

    expect(startTime.hour).toEqual(testTime.hour);
    expect(startTime.minutes).toEqual(testTime.minutes);
    expect(startTime.period).toEqual(testTime.period);
  });
});
