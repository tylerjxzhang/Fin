'use strict';

/**
 * @ngdoc function
 * @name finApp.controller:FinCtrl
 * @description
 * # FinCtrl
 * Controller of the finApp
 */
angular.module('finApp')
  .controller('FinCtrl', function ($rootScope,$scope,$interval,$firebaseObject, $firebaseArray) {
    $scope.convert = function(ms){
            var x = Math.floor(ms / 1000);
            var seconds = x % 60;
            x = Math.floor(x/60);
            var minutes = x % 60;
            x = Math.floor(x/60);
            var hours = x;
          var time = hours + ':' + minutes + ':' + seconds;
          return time;
    };
    $scope.sum = function(activity){
        var sum = 0;
        $.each(activity.time, function(key, value){
            if(activity.time[key].Start > 1459641600000){
                sum += activity.time[key].End - activity.time[key].Start;
            }
        })
        //console.log(activity.name + ": " + sum)
        return sum;
    };
    $scope.round = function(num){
        return Math.round(num*100)/100;
    };
    
    $scope.startTiming = function(activity, stopwatch){
        activity.timing = true;
        $scope.sharedTime = new Date();
          $interval(function() {
            $scope.sharedTime = new Date();
          }, 500);
    };
    
    $scope.endTiming = function(activity, time){
        activity.timing = false;
        var endTime = new Date().getTime();
        var startTime = endTime - time;
        console.log(activity);
        var ref = new Firebase('https://dazzling-heat-9788.firebaseio.com/activities/'+activity.id+'/time/');
        
        var list = $firebaseArray(ref);
        console.log(list);
        list.$add({
          "Start": startTime+"",
          "End": endTime+""
        });
        
    };
    
    $scope.newActivity = function(){
        var ref = new Firebase('https://dazzling-heat-9788.firebaseio.com/activities/');
        var list = $firebaseArray(ref);
        list.$add({
            "color":$scope.color || "#edf42f",
            "id":$rootScope.activities.length,
            "name":$scope.actName,
            "targetTime": ($scope.targetTime.slice(':')[0]*60*1000 || 0) + ($scope.targetTime.slice(':')[1]*1000 || 0),
            "time":[],
            "timeing":false,
            "type":"Living"
        });
    }
})
.directive('stopwatch', function() { return {
  restrict: 'AE',
  templateUrl: 'stopwatch.html',
  scope: {
    // Set title in the isolate scope from the title attribute on the directive's element.
    title: '@title',
    // Set up a bi-directional binding between currentTime on the local scope and the parent
    // scope's variable containing the current time that's the value of the time attribute.
    currentTime: '=time'
  },
  
  link: function(scope, element, attrs, ctrl) {
  },
  
  controllerAs: 'swctrl',
  controller: function($scope, $interval) {
    console.log("Creating the directive's controller");
    var self = this;
    var started = false;
    var totalElapsedMs = 0;
    var elapsedMs = 0;
    //var time;
    var startTime;
    var timerPromise;
    
    self.start = function() {
      if (!timerPromise) {
        startTime = new Date();
          started = true;
          console.log(started);
        timerPromise = $interval(function() {
          var now = new Date();
          //$scope.time = now;
          elapsedMs = now.getTime() - startTime.getTime();
        }, 31);
          
      }
    };
      
    self.convert = function(ms){
            var x = Math.floor(ms / 1000);
            var seconds = x % 60;
            x = Math.floor(x/60);
            var minutes = x % 60;
            x = Math.floor(x/60);
            var hours = x;
          var time = hours + 'hr  ' + minutes + 'min  ' + seconds + 'sec';
          return time;
    };
    
    self.stop = function() {
      if (timerPromise) {
        $interval.cancel(timerPromise);
        timerPromise = undefined;
        totalElapsedMs += elapsedMs;
        elapsedMs = 0;
      }
        //console.log($scope.$parent);
        $scope.$parent.$parent.endTiming($scope.$parent.activity, self.getElapsedMs());
    };
    
    self.reset = function() {
      startTime = new Date();
      totalElapsedMs = elapsedMs = 0;
    };
    
    self.getTime = function() {
      return time;
    };
    
    self.getElapsedMs = function() {
      return totalElapsedMs + elapsedMs;
    };
  }
}});





