'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('addEventCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var em = this;

    em.postEvent = function(){
      let d = new Date(em.eventdate._d.toString());
      let date_posted = formatDate(new Date());
      let postedEvent = {
        'event_type':em.event_type,
        'event_datetime':d.toISOString(),
        'event_message':em.event,
        'e_id': $rootScope.id,
        'date_posted': date_posted,
        'event_status': 'approved'
      };
      postEvents(postedEvent);
      // console.log(d.toISOString());
      // console.log(d.getFullYear()+""+d.getMonth()+""+d.getDate());
      // let newdate = moment(new Date('August 6, 2019')).format('YYYYMMDD');
      // console.log(moment(new Date('August 6, 2019')).format('YYYYMMDD'));
      // console.log(moment(newdate, "YYYYMMDD").fromNow());
      // console.log(moment().startOf('hour').fromNow());
    }

    function postEvents(event){
      apiService.postEvents(event).then(function(response){
        swalert.successAlert(response.data.message);
        $scope.$emit('success_post_from_addeventCtrl', 'success');
        em.event_type = "";
        em.event = "";
        em.eventdate = "";
      }, function(err){
        console.log(err);
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