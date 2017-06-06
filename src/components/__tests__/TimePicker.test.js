'use strict';

jest.dontMock('../TimePicker');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Moment from 'moment';
import BabysitterBooking from '../BabysitterBooking';

describe('Selected TimePicker', () => {

  it('sets state.startTime to 5:30PM when 5:30PM is selected', () => {
    const testTime = new Moment().startOf('day').hour(17).minute(30);

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking />);
    const select = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'start_time_select');

    ReactTestUtils.Simulate.change(select, { target: { value: testTime.format('X') } });
    const startTime = new Moment.unix(booking.state.startTime);

    expect(startTime.isSame(testTime)).toBeTruthy();
  });

  it('allows multiple TimePickers in a Booking to set state.startTime and state.endTime to selected values', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(30);
    const endTime = new Moment().startOf('day').hour(21).minute(30);

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking />);

    const selectStart = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'start_time_select');
    const selectEnd = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'end_time_select');
    ReactTestUtils.Simulate.change(selectStart, { target: { value: startTime.format('X') } });
    ReactTestUtils.Simulate.change(selectEnd, { target: { value: endTime.format('X') } });

    const returnedStartTime = new Moment.unix(booking.state.startTime);
    const returnedEndTime = new Moment.unix(booking.state.endTime);

    expect(returnedStartTime.isSame(startTime)).toBeTruthy();
    expect(returnedEndTime.isSame(endTime)).toBeTruthy();
  });

  it('properly accepts default values', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(0);
    const endTime = new Moment().startOf('day').hour(21).minute(0);

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking />);

    const defaultStart = new Moment.unix(booking.state.startTime);
    const defaultEnd = new Moment.unix(booking.state.endTime);

    expect(defaultStart.isSame(startTime)).toBeTruthy();
    expect(defaultEnd.isSame(endTime)).toBeTruthy();
  });
});
