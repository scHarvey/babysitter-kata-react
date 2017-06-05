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

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking />);
    const select = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'start_time_select');

    ReactTestUtils.Simulate.change(select, { target: { value: `${testTime.hour}|${testTime.minutes}|${testTime.period}` } });
    const startTime = booking.state.startTime;

    expect(startTime.hour).toEqual(testTime.hour);
    expect(startTime.minutes).toEqual(testTime.minutes);
    expect(startTime.period).toEqual(testTime.period);
  });

  it('allows multiple TimePickers in a Booking to set state.startTime and state.endTime to selected values', () => {
    const startTime = {
      hour: 5,
      minutes: 30,
      period: "PM"
    };
    const endTime = {
      hour: 9,
      minutes: 30,
      period: "PM"
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking />);
    const selectStart = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'start_time_select');
    const selectEnd = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'end_time_select');
    ReactTestUtils.Simulate.change(selectStart, { target: { value: `${startTime.hour}|${startTime.minutes}|${startTime.period}` } });
    ReactTestUtils.Simulate.change(selectEnd, { target: { value: `${endTime.hour}|${endTime.minutes}|${endTime.period}` } });

    const returnedStartTime = booking.state.startTime;
    const returnedEndTime = booking.state.endTime;

    console.log(returnedStartTime);
    console.log(returnedEndTime);

    expect(returnedStartTime.hour).toEqual(startTime.hour);
    expect(returnedStartTime.minutes).toEqual(startTime.minutes);
    expect(returnedStartTime.period).toEqual(startTime.period);

    expect(returnedEndTime.hour).toEqual(endTime.hour);
    expect(returnedEndTime.minutes).toEqual(endTime.minutes);
    expect(returnedEndTime.period).toEqual(endTime.period);
  });
});
