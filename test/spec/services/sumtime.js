'use strict';

describe('Service: sumTime', function () {

  // load the service's module
  beforeEach(module('finApp'));

  // instantiate service
  var sumTime;
  beforeEach(inject(function (_sumTime_) {
    sumTime = _sumTime_;
  }));

  it('should do something', function () {
    expect(!!sumTime).toBe(true);
  });

});
