'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:manageEventsCtrl
 * @description
 * # manageEventsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('manageEventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert', 'debounce', 
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, debounce) {

    var me = this;
    me.update_status = "Update";
    watchSearched();

    $scope.$on('success_post_from_mainCtrl_to_manageEventCtrl', function(){
      getEvents();
    });

    me.updateEvent = function(){
      me.update_status = "Updating...";
      let d = new Date(me.eventdate._d.toString());
      let updatedEvent = {
        'event_type':me.event_type,
        'event_datetime':d.toISOString(),
        'event_message':me.event_message,
        'event_id': me.event_id,
      };
      updateEvent(updatedEvent);
    }

    me.editEvent = function(event){
      console.log(event);
      me.editingEvent = event;
      me.event_id = event.event_id;
      me.event_type = event.event_type;
      me.event_message = event.event_message;
      me.editing = true;
      me.eventdate = moment(event.event_datetime);
    }

    me.cancelEditing = function(){
      me.editing = false;
    }

    me.eventSelected = function(){
      me.selectedevent != "" ? me.eventTypeSelected = true : me.eventTypeSelected = false;
      if (me.alumni_name) {
        watchSearched();
      }
    }

    me.approvedEvents = function(event){
      let approved_event = {
        event_id: event.event_id,
        event_status: 'approved'
      };
      approvedEvents(approved_event);
    }

    me.removeEvent = function(eventDetails){
      swalert.deleteInfo(eventDetails, removePostedEvent);
    }

    function getEvents() {
      apiService.getEvents().then(function(response){
        me.events = response.data;
        console.log(response);
      }, function(error){
        console.log(error);
      });
    }

    function updateEvent(eventDetails){
      apiService.updateEvent(eventDetails).then(function(response){
        me.editing = false;
        me.update_status = "Update";
        me.editingEvent.event_message = me.event_message;
        swalert.successAlert(response.data.message);
      },function(err){
        console.log(err);
      });
    }

    function approvedEvents(approved_event){
      apiService.approvedEvents(approved_event).then(function(response){
        swalert.successAlert(response.data.message);
        getEvents();
        console.log(response);
      },function(err){
        console.log(err);
      });      
    }

    function removePostedEvent(eventDetails){
      apiService.removePostedEvent(eventDetails).then(function(response){
        me.events.splice(me.events.indexOf(eventDetails), 1);
        swalert.successAlert(response.data.message);
      },function(err){
        console.log(err);
      });
    }

    function getSearchedEvents(searchedDetails) {
      apiService.getSearchedEvents(searchedDetails).then(function(response){
        me.events = response.data;
        console.log(response);
      }, function(error){
        console.log(error);
      });
    }

    function watchSearched(){
      $scope.$watch('me.alumni_name', debounce(function(oldVal, newVal) {
        if (me.selectedevent && me.alumni_name) {
          let searched = {
            'event_type': me.selectedevent,
            'searched_name': me.alumni_name
          };
          getSearchedEvents(searched);
        }
        else{
          getEvents();
        }
      },500), true);
    }
}]);
