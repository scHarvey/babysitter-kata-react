'use strict';

jest.dontMock('../BabysitterBooking');

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Moment from 'moment';
import BabysitterBooking from '../BabysitterBooking';

describe('BabysitterBooking startTime ', () => {

  it('returns a 400 error if startTime is earlier than 5:00PM', () => {
    const startTime = new Moment().startOf('day').hour(16).minute(30).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.st_validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('Start time is earlier than the allowed time.');
  });

  it('returns a 200 OK if startTime is later than 5:00PM', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(30).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.st_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 OK if startTime is 5:00PM', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(0).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.st_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 OK if startTime is 5:51PM', () => {
    const startTime = new Moment().startOf('day').hour(17).minute(51).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking startTime={startTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.st_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 OK if startTime is the next morning before 4am', () => {
    const startTime = new Moment().startOf('day').hour(26).minute(30).format('X');

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
    const endTime = new Moment().startOf('day').hour(30).minute(0).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('End time is later than the allowed time.');
  });

  it('returns a 200 if endTime is earlier than 4:00AM', () => {
    const endTime = new Moment().startOf('day').hour(24).minute(30).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 200 if endTime is 4:00AM', () => {
    const endTime = new Moment().startOf('day').hour(28).minute(0).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(200);
    expect(validation.message).toEqual('OK');
  });

  it('returns a 400 if endTime is 4:01AM', () => {
    const endTime = new Moment().startOf('day').hour(28).minute(1).format('X');

    const booking = ReactTestUtils.renderIntoDocument(<BabysitterBooking endTime={endTime} />);

    const form = ReactTestUtils.findRenderedDOMComponentWithClass(booking, 'booking_form');

    ReactTestUtils.Simulate.submit(form);

    const validation = booking.state.et_validation;
    expect(validation.code).toEqual(400);
    expect(validation.message).toEqual('End time is later than the allowed time.');
  });
});
