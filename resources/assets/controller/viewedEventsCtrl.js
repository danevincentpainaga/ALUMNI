'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('viewedEventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$timeout', '$stateParams', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $timeout, $stateParams, apiService, swalert) {

    var ve = this;
    ve.co_department = [];
    console.log($stateParams.source);   
    getUserProfile($stateParams.source);
    getEventsById($stateParams.source);

    for (var i = 0; i < 4; i++) {
      ve.co_department.push({"photo": "user.jpg"});
    }

    ve.thisTimeline = function(){
      $state.go("viewed", {'sp' : ve.fullname, source: ve.viewed_alumni[0].id});
    }

    ve.thisProfile = function(){
      $state.go("viewed.profile");
    }

    ve.thisProfileFellows = function(){
      $state.go("viewed.fellows");
    }

    function getUserProfile(source_id) {
      apiService.getUserProfile(source_id).then(function(response){
        ve.fullname = response.data[0].firstname+" "+response.data[0].middlename+" "+response.data[0].lastname;
        ve.viewed_alumni = response.data;
        getCoDepartments(response.data[0].u_departmentId);
        ve.p_pic = response.data[0].photo;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

    function getCoDepartments(deptId) {
      apiService.getCoDepartments(deptId).then(function(response){
        for(i = 0; i < response.data.length; i++){
          ve.co_department[i].photo = response.data[i].photo;
        }
      }, function(error){
        console.log(error);
      });
    }

    function getEventsById(id) {
      apiService.getEventsById(id).then(function(response){
        ve.events = response.data;
        if (ve.events.length === 0) {
          ve.response_message = "No posted events yet.";
          ve.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }

}]);
