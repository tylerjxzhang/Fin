'use strict';

/**
 * @ngdoc function
 * @name finApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the finApp
 */
angular.module('finApp')
  .controller('MainCtrl', function ($rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
