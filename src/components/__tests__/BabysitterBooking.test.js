'use strict';

jest.dontMock('../BabysitterBooking');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import BabysitterBooking from '../BabysitterBooking';

describe('BabysitterBooking', () => {

  it('returns a 400 error if startTime is earlier than 5:00PM', () => {
    const startTime = {
      hour: 4,
      minutes: 0,
      period: 'PM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);
    // console.log(booking);
    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');
    // console.log(form);
    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('Start time is earlier than the allowed time.');
  });
});
