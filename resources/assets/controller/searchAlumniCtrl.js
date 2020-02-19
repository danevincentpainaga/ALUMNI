'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:searchAlumniCtrl
 * @description
 * # searchAlumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('searchAlumniCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$timeout', 'apiService', 'swalert', 'debounce',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $timeout, apiService, swalert, debounce) {

    var sa = this;

    $scope.$watch('sa.search_alumni', debounce(function(oldVal, newVal) {
      console.log(sa.search_alumni);
      if (sa.search_alumni) {
        getSearchedAlumni(sa.search_alumni);
      }
      else{
        sa.hasNoResults = false;
        sa.alumni_list = {};
      }
    },650), true);

    sa.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
      sa.alumni_list = {};
    }

    function getSearchedAlumni(searchName) {
      apiService.getSearchedAlumni(searchName).then(function(response){
        sa.alumni_list = response.data;
        if (sa.alumni_list.length > 0) {
          sa.hasNoResults = false;
        }
        else{
          sa.hasNoResults = true;
        }
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }
    

}]);
