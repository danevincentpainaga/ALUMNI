'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:updateAlmuniModalCtrl
 * @description
 * # updateAlmuniModalCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('updateAlmuniModalCtrl',['$scope', '$rootScope', '$cookies','$window', '$q', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $q, $location, $timeout, apiService, swalert) {


    var uc = this;
    uc.section_list =["A","B","C","D","E","F","G","H","I", "J", "K", "L", "M", "N", "O", "P"];

    $scope.$on('broadcastedAlumniDetailsFromMainCtrl', function(val, obj){
      uc.alumni = obj;
      $q.all([apiService.getCourses(obj.u_departmentId)]).then(function(response){
        uc.courses = response[0].data;
        giveInitialValueToCourse(obj.u_courseId);
        uc.section = obj.section;
        uc.gender = obj.gender;
        console.log(obj);
      });

    });

    function giveInitialValueToCourse(courseId){
      angular.forEach(uc.courses, function(val, i){
        courseId == val.course_id ? uc.selectedCourse = val : null;
      });
    }

}]);
