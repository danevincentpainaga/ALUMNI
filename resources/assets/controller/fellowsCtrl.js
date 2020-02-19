'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:fellowsCtrl
 * @description
 * # fellowsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('fellowsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$stateParams', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $stateParams, $timeout, apiService, swalert) {

    var f = this;
    var alumniCred = {
      'u_alumniId': $rootScope.u_alumniId,
      'u_departmentId': $rootScope.departmentId,
      'u_courseId': $rootScope.courseId,
      'year_graduated': $rootScope.year_graduated,
      'section': $rootScope.section,
    }

    fellowClassmates(alumniCred);

    f.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
    }


    function fellowClassmates(alumniCred) {
      apiService.getfellowClassmates(alumniCred).then(function(response){
        f.classmates = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);