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

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('Start time is earlier than the allowed time.');
  });

  it('returns a 200 OK if startTime is later than 5:00PM', () => {
    const startTime = {
      hour: 6,
      minutes: 0,
      period: 'PM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 OK if startTime is 5:00PM', () => {
    const startTime = {
      hour: 5,
      minutes: 0,
      period: 'PM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 OK if startTime is AM', () => {
    const startTime = {
      hour: 12,
      minutes: 0,
      period: 'AM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });
});
