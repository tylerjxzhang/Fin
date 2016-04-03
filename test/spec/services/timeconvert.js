'use strict';

describe('Service: timeConvert', function () {

  // load the service's module
  beforeEach(module('finApp'));

  // instantiate service
  var timeConvert;
  beforeEach(inject(function (_timeConvert_) {
    timeConvert = _timeConvert_;
  }));

  it('should do something', function () {
    expect(!!timeConvert).toBe(true);
  });

});
