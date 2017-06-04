'use strict';

jest.dontMock('../BabysitterBooking');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import BabysitterBooking from '../BabysitterBooking';

describe('BabysitterBooking startTime ', () => {

  it('returns a 400 error if startTime is earlier than 5:00PM', () => {
    const startTime = {
      hour: 4,
      minutes: 0,
      period: 'PM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.st_validation;
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

    const validation = booking.state.st_validation;
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

    const validation = booking.state.st_validation;
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

    const validation = booking.state.st_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });
});

describe('BabysitterBooking endTime', () => {
  it('returns a 400 error if endTime is later than 4:00AM', () => {
    const endTime = {
      hour: 6,
      minutes: 0,
      period: 'AM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('End time is later than the allowed time.');
  });

  it('returns a 200 if endTime is earlier than 4:00AM', () => {
    const endTime = {
      hour: 2,
      minutes: 0,
      period: 'AM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 if endTime is 4:00AM', () => {
    const endTime = {
      hour: 4,
      minutes: 0,
      period: 'AM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 400 if endTime is 4:01AM', () => {
    const endTime = {
      hour: 4,
      minutes: 1,
      period: 'AM'
    };

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('End time is later than the allowed time.');
  });
});
