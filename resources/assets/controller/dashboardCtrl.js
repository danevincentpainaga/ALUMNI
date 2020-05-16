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
    departments();
    getEmployedUnemployedDepartments();

    db.onClick = function (points, evt) {
      console.log(points, evt);
    };

    db.filterDepartment = function(){
      getEmployedUnemployedDepartments(db.selectedDepartment.department_id);
    }

    function departments(){
      apiService.departments().then(function(response){
        console.log(response);
        db.departments = response.data;
      }, function(error){
        console.log(error);
      });      
    }

    function getEmployedUnemployedDepartments(deptId){
      apiService.getEmployedUnemployedDepartments(deptId).then(function(response){
        console.log(response.data.length);
        if (response.data.length > 0) {
          db.data = [];
          db.labels = [];
          var employed = [];
          var unemployed = [];
          angular.forEach(response.data, function(val, i){
            db.labels.push(val.course_name);
            employed.push(val.Employed);
            unemployed.push(val.Unemployed);
          });
          db.data.push(employed);
          db.data.push(unemployed);
          db.series = ['Employed', 'Unemployed'];
          console.log("success");
        }
        else{
          db.data = [0];
          db.labels = ["courses"];
          db.series = ['Employed', 'Unemployed'];
          console.log("failed");
        }
      }, function(error){
        console.log(error);
      });      
    }
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