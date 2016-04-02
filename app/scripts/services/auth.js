'use strict';

/**
 * @ngdoc service
 * @name finApp.Auth
 * @description
 * # Auth
 * Factory in the finApp.
 */
angular.module('finApp')
  .factory('Auth', function ($firebaseAuth) {
    var ref = new Firebase("https://dazzling-heat-9788.firebaseio.com/");
    return $firebaseAuth(ref);
  });
