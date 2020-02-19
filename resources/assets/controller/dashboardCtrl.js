'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('dashboardCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var db = this;
    getEmployedUnemployedDepartments();
    // displayDataToGraph();

    function displayDataToGraph() {
      apiService.getDepartments().then(function(response){
        // $timeout(function() {
          db.labels1 = [];
          angular.forEach(response.data, function(val, i){
            db.labels1.push(val.department_name);
          });

          db.series1 = ['Employed', 'Unemployed'];
          db.data1 = [
            [500, 300,700],
            [200, 100,500],
          ];
        // }, 1000 );
      }, function(error){
        console.log(error);
      });
    }

    db.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];
    db.series = ['Series A'];

    db.data = [
      [65, 59, 40, 81, 56, 55, 40],
    ];

    db.onClick = function (points, evt) {
      console.log(points, evt);
    };


    function getEmployedUnemployedDepartments(){
      apiService.getEmployedUnemployedDepartments().then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });      
    }


    // db.graph = {
    //   'max-height': $scope.windowHeight+'px'
    // };
    // Simulate async data update
    // $timeout(function () {
    // db.data = [
    //   [28, 48, 40, 19, 86, 27, 90],
    //   [65, 59, 80, 81, 56, 55, 40]
    // ];
    // }, 3000);
}]);

app.directive('graph-style', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        let mh = attrs.maxheight;
        elem.addClass('graphStyle');
      }
    }
 });