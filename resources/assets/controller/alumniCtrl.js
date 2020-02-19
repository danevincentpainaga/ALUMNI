'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('alumniCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var a = this;
    alumni();

    a.emitAlumniDetailsToUpdate = function(alumniDetails){
      $scope.$emit('alumniDetailsFromAlumniCtrl', alumniDetails);
    }

    function alumni() {
      apiService.getAlumni().then(function(response){
        a.alumni_list = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);
