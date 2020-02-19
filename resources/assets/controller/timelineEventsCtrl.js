'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:timelineEventsCtrl
 * @description
 * # timelineEventsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('timelineEventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state','$timeout', 'apiService', 'socket', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $timeout, apiService, socket, swalert) {

    var t = this;
    t.co_department = [];

    for (var i = 0; i < 8; i++) {
      t.co_department.push({"photo": "user.jpg", "firstname": ""});
    }

    getCoDepartments($rootScope.departmentId);
    getEvents('approved');
    t.modalstate = false;
    t.event_type = "all";
    t.eventTypes = ["all", "Job Opportunities", "Announcement/Events"];

    socket.on('laravel_database_test-channel', function(data) {
      if (data[0].event_status === 'approved') {
        t.events.unshift(data[0]);
      }  
    });

    t.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
    }

    t.postEvent = function(){
      let date_posted = formatDate(new Date());
      if (t.type_of_event && t.event && date_posted) {
        let d = new Date(t.eventdate._d.toString());
        let postedEvent = {
          'event_type':t.type_of_event,
          'event_datetime':d.toISOString(),
          'event_message':t.event,
          'e_id': $rootScope.id,
          'date_posted': date_posted,
          'event_status': $rootScope.user_type === 'admin' ? 'approved' : 'pending'
        };
        postEvents(postedEvent);
      }
    }

    t.selectedStatus = function(eventType){
      let etype;
      if (eventType === "Announcement/Events") {
        etype = eventType.replace("/", "%");
      }else{
        etype = eventType;
      }
      getAllEventsByType(etype);
    }

    t.post = function(){
      t.posting = true;
    }

    t.cancelPost = function(){
      t.posting = false;
    }

    function getEvents(status) {
      apiService.getEvents(status).then(function(response){
        t.events = response.data;
        console.log(response);
      }, function(error){
        console.log(error);
      });
    }

    function getAllEventsByType(eventType) {
      apiService.getAllEventsByType(eventType).then(function(response){
        t.events = response.data;
        if (t.events.length > 0) {
          t.empty_post = false;
        }
        else{
          t.response_message = "No "+eventType.event_type+" events";
          t.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }

    function postEvents(event){
      apiService.postEvents(event).then(function(response){
        if (response.data.status === 'approved') {
          t.posting = false;
          t.modalstate = true;
          t.event = "";
          swalert.successInfo(response.data.message, 'success', 1000);
        }else{
          t.posting = false;
          t.modalstate = true;
          t.event = "";          
          swalert.noTimeoutSuccessAlert(response.data.message);
        }
        console.log(t.modalstate);
      }, function(err){
        console.log(err);
      });
    }

    function getCoDepartments(deptId) {
      apiService.getCoDepartments(deptId).then(function(response){
        for(i = 0; i < response.data.length; i++){
          if (response.data[i].firstname.length > 4) {
            t.co_department[i].photo = response.data[i].photo;
            t.co_department[i].firstname = response.data[i].firstname.substr(0, 4)+"...";
          }
          else{
            t.co_department[i].photo = response.data[i].photo;
            t.co_department[i].firstname = response.data[i].firstname;         
          }

        }
      }, function(error){
        console.log(error);
      });
    }

    function formatDate(stringDate){
        var month = new Array();
        month[0] = "January"; month[1] = "February"; month[2] = "March"; 
        month[3] = "April";month[4] = "May"; month[5] = "June"; month[6] = "July";
        month[7] = "August"; month[8] = "September"; month[9] = "October";
        month[10] = "November"; month[11] = "December";

      var date = new Date(stringDate);
      return month[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
    }


}]);

app.factory('socket', function ($rootScope) {
  var socket = io.connect('127.0.0.1:8000');
  return {
      on: function (eventName, callback) {
          socket.on(eventName, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  callback.apply(socket, args);
              });
          });
      },
      emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  if (callback) {
                      callback.apply(socket, args);
                  }
              });
          })
      }
  };
});

app.directive('triggerUpload', function(){
    return {
      restrict: 'A',
      scope:{
        message: '@',
        event_date: '@',
        etype: '@',
        cmodal: '='
      },
      link: function(scope, elem, attrs) {
        elem.on('click', function(){
          if (scope.message!=="" && scope.event_date!=="" && scope.etype!=="") {
              $('#uploadingModal').modal({
                  backdrop: 'static',
                  keyboard: false
              });
          }
          scope.$watch('cmodal', function(newVal, oldVal){
            if (newVal === true) {
              $('#uploadingModal').modal('hide');
              scope.cmodal = false;
              console.log(scope.cmodal);
            }
          });
        });
      }
    }
 });

app.filter('checkPostPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    else{
      return 'user_event.jpg';
    }
  }
});
