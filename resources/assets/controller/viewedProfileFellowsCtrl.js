'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:viewedProfileFellowsCtrl
 * @description
 * # viewedProfileFellowsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('viewedProfileFellowsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$stateParams', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $stateParams, $timeout, apiService, swalert) {

    var vf = this;
    
    getViewedfellowClassmates($stateParams.source);

    vf.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
    }


    function getViewedfellowClassmates(id) {
      apiService.getViewedfellowClassmates(id).then(function(response){
        vf.co_department = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);