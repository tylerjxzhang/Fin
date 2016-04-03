'use strict';

/**
 * @ngdoc function
 * @name finApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the finApp
 */
angular.module('finApp')
.controller("DashboardCtrl", function($scope,$rootScope){
    $scope.list = [];
    
    
    $scope.sumOf = function(activity){
        var sum = 0;
        $.each(activity.time, function(key, value){
                sum += activity.time[key].End - activity.time[key].Start;
        })
        //console.log(activity.name + ": " + sum)
        return sum;
    };
    
    $scope.dataGen = function(){
        $scope.showGraph = 1;
        $.each($rootScope.activities,function(key, value){
            $scope.list.push({
                "label": value.name,
                "value": $scope.sumOf(value)
            })
        });
        console.log(JSON.stringify($scope.list));
    };
    
    $scope.dataGen();
});
