'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('myeventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var m = this;
    getEventsById($rootScope.id);
    m.event_status = "all";
    m.statuses = ["all", "approved", "pending"]

    $scope.$on('event_to_be_remove', function(val, obj){
      m.events.splice(m.events.indexOf(obj), 1);
    });

    m.selectedStatus = function(status){
      let user_event = {
        id: $rootScope.id,
        event_status: status
      };
      getEventsByStatus(user_event);
    }

    function getEventsById(id) {
      apiService.getEventsById(id).then(function(response){
        m.events = response.data;
        if (m.events.length === 0) {
          m.response_message = "No posted events yet.";
          m.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }

    function getEventsByStatus(user_event) {
      apiService.getEventsByStatus(user_event).then(function(response){
        m.events = response.data;
        if (m.events.length > 0) {
          m.empty_post = false;
        }
        else{
          m.response_message = "No "+user_event.event_status+" events";
          m.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }
    
}]);

app.directive('eventStatus', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var stats = attrs.status;
          if(stats=="approved"){
            elem.addClass('badge-info');
          }
          else if(stats=="pending"){
            elem.addClass('badge-danger');
          }
      }
    }
 });

// Controller for updatePostEventCustomDirective //
app.controller('editEventCtrl', ['$scope', 'apiService', 'swalert', function($scope, apiService, swalert) {
  var e = this;
  e.update_status = "Update";

  e.editEvent = function(event){
    e.selected_event = event;
    e.event_id = event.event_id;
    e.event_type = event.event_type;
    e.event_message = event.event_message;
    e.event_editing = true;
    e.eventdate = moment(event.event_datetime);
  }

  e.cancelEditing = function(){
    e.event_editing = false;
  }

  e.updateEvent = function(){
    e.update_status = "Updating...";
    e.updating = true;
    let d = new Date(e.eventdate._d.toString());
    let updatedEvent = {
      'event_type':e.event_type,
      'event_datetime':d.toISOString(),
      'event_message':e.event_message,
      'event_id': e.event_id,
    };
    e.selected_event.event_type = e.event_type;
    e.selected_event.eventdate = d.toISOString();
    e.selected_event.event_message = e.event_message;
    updateEvent(updatedEvent);
  }

  e.removeEvent = function(eventDetails){
    swalert.deleteInfo(eventDetails, removePostedEvent);
  }

  function updateEvent(eventDetails){
    apiService.updateEvent(eventDetails).then(function(response){
      swalert.successInfo(response.data.message, 'success', 2000);
      e.event_editing = false;
      e.update_status = "Update";
      e.updating = false;
    },function(err){
      console.log(err);
    });
  }

  function removePostedEvent(eventDetails){
    apiService.removePostedEvent(eventDetails).then(function(response){
      $scope.$emit('event_to_be_remove', eventDetails );
      swalert.successInfo(response.data.message, 'success', 2000);
    },function(err){
      console.log(err);
    });
  }

}]);

app.directive('updatePostEvent', function(){
    return {
      restrict: 'E',
      scope: {
        event: '='
      },
      templateUrl:'views/edit_event_template_directive.html',
      controller: 'editEventCtrl',
      controllerAs: 'e',
    }
 });
