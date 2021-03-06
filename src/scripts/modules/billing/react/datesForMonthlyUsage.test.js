var assert = require('assert');
var computeDatesForMonthlyUsage = require('./datesForMonthlyUsage').compute;
var moment = require('moment');

describe('computeDatesForMonthlyUsage', function() {
  describe('#computeDatesForMonthlyUsage()', function() {
    it('it should return previous day for both dates', function() {
      assert.deepEqual(computeDatesForMonthlyUsage(
        moment('2017-01-01'), // computation start
        moment('2017-05-17'), // now
        moment('2017-05-17') // projectCreation
      ), {
        dateFrom: '2017-05-16',
        dateTo: '2017-05-16'
      });
    });

    it('it should return computation start date and previous day', function() {
      assert.deepEqual(computeDatesForMonthlyUsage(
        moment('2017-01-01'), // computation start
        moment('2017-05-17'), // now
        moment(null) // projectCreation not set
      ), {
        dateFrom: '2017-01-01',
        dateTo: '2017-05-16'
      });
    });

    it('it should return computation start date and previous day', function() {
      assert.deepEqual(computeDatesForMonthlyUsage(
        moment('2017-01-01'), // computation start
        moment('2017-05-17'), // now
        moment('2016-08-01') // projectCreation before computation
      ), {
        dateFrom: '2017-01-01',
        dateTo: '2017-05-16'
      });
    });

    it('it should return previous day for both dates', function() {
      assert.deepEqual(computeDatesForMonthlyUsage(
        moment('2017-01-01'), // computation start
        moment('2017-05-17'), // now
        moment('2017-05-30') // projectCreation in future
      ), {
        dateFrom: '2017-05-16',
        dateTo: '2017-05-16'
      });
    });
  });
});
