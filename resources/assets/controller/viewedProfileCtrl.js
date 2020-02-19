'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('viewedProfileCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', '$stateParams', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, $stateParams, apiService, swalert) {

    var _vp = this;
    getUserProfile($stateParams.source);
    getAlumniEducations($rootScope.id);

    function getUserProfile(source_id) {
      apiService.getUserProfile(source_id).then(function(response){
        _vp.viewed_profile = response.data;
        getAlumniSkills(response.data[0].alumni_id);
        getAlumniWorkExp(response.data[0].alumni_id);
        getAlumniBusinesses(response.data[0].alumni_id);
      }, function(error){
        console.log(error);
      });
    }

    function getAlumniSkills(id) {
      apiService.getAlumniSkills(id).then(function(response){
        _vp.skills = response.data;
        checkIfSkillsIsEmpty(_vp.skills);
      }, function(error){
        console.log(error);
      });
    }

    function getAlumniWorkExp(aid){
      apiService.getAlumniWorkExp(aid).then(function(response){
        _vp.work_experiences = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniEducations(aid){
      apiService.getAlumniEducations(aid).then(function(response){
        _vp.educations = response.data;
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniBusinesses(aid){
      apiService.getAlumniBusinesses(aid).then(function(response){
        _vp.businesses = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function checkIfSkillsIsEmpty(response){
      if (response.length > 0) {
        _vp.emptySkills = false;
      }
      else{
        _vp.emptySkills = true;
      }
    }
}]);
