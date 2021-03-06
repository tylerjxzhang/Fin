'use strict';

/**
 * @ngdoc function
 * @name finApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the finApp
 */
angular.module('finApp')
  .controller('SigninCtrl', function ($rootScope,$scope,Auth,$location) {
    
    $scope.loginFB = function($rootScope){
        Auth.$authWithOAuthPopup("facebook")
        .then(function(authData){
            console.log(authData);
        })
        .catch(function(error){
            console.log(error);
        });
    };
    $scope.loginGH = function(){
        Auth.$onAuth(function(authData){
            $rootScope.loggedIn = true;
            $rootScope.authData = authData;
            $location.path('/fin');
            console.log(authData);
        });
        Auth.$authWithOAuthPopup("github")
        .catch(function(error){
            console.log(error);
        });
    };
    $scope.loginGG = function(){
        Auth.$authWithOAuthPopup("google")
        .then(function(authData){
            console.log(authData);
        })
        .catch(function(error){
            console.log(error);
        });
    }
    
  });
