'use strict';

/**
 * @ngdoc overview
 * @name finApp
 * @description
 * # finApp
 *
 * Main module of the application.
 */
angular
  .module('finApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve:{
          loginCheck : function($location, $rootScope){
              if($rootScope.loggedIn){
                  $location.path('/fin');
              };
              $rootScope.logout = function(Auth){
                $rootScope.loggenIn = false;
                $rootScope.authData = null;
                Auth.$unauth;
                $location.path('/signin');
            };
          }  
        },
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/dashboard', {
        resolve:{
            currentAuth:function(Auth){
                return Auth.$waitForAuth();
            },
          loginCheck : function($location, $rootScope){
              if(!$rootScope.loggedIn){
                  $location.path('/signin');
              };
              
              var ref = new Firebase('https://dazzling-heat-9788.firebaseio.com/activities');
              
              ref.on("value", function(snapshot){
              $rootScope.activities = snapshot.val();
                console.log(snapshot.val());
            }, function (errorObject){
              console.log("The read failed: " + errorObject.code);
            });
          }  
        },
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl',
        controllerAs: 'signin'
      })
      .when('/createaccount', {
        templateUrl: 'views/createaccount.html',
        controller: 'CreateaccountCtrl',
        controllerAs: 'createaccount'
      })
      .when('/fin', {
        templateUrl: 'views/fin.html',
        controller: 'FinCtrl',
        controllerAs: 'fin',
        resolve:{
            currentAuth:function(Auth){
                return Auth.$waitForAuth();
            },
          loginCheck : function($location, $rootScope){
              if(!$rootScope.loggedIn){
                  $location.path('/signin');
              };
              var ref = new Firebase('https://dazzling-heat-9788.firebaseio.com/activities');

            ref.on("value", function(snapshot){
              $rootScope.activities = snapshot.val();
                console.log(snapshot.val());
            }, function (errorObject){
              console.log("The read failed: " + errorObject.code);
            });
          }  
        },
      })
      .otherwise({
        redirectTo: '/'
      });
  });
