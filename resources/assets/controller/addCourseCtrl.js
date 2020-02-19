'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:addCourseCtrl
 * @description
 * # addCourseCtrl
 * Controller of the PPMS
 */
var app = angular.module('myApp')
  app.controller('addCourseCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert', 'debounce',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, debounce) {

  var ac = this;
  ac.disableSave = true;

  $scope.$watch('ac.course', debounce(function() {
     console.log(ac.course);
     if(!ac.course){
        ac.passedOrFail = null;
        ac.success = false;
        ac.fail = false;
        ac.disableSave = true;
     }
     else
     {
        validateCourseIfExist(ac.course);
     }
  },500), true);
 
  ac.addCourse = function(courseValue){
    let cValue = { course_name: courseValue.toUpperCase(), c_departmentId: $rootScope.departmentId };
    if(cValue && ac.success == true){
      swalert.saveAlert(cValue, addedCourse);
    }
  }

  ac.closeModal = function(){
    ac.course = "";
    ac.passedOrFail = null;
    ac.success = false;
    ac.fail = false;
    ac.disableSave = true;
  }

  function validateCourseIfExist(courseName){
    apiService.validateCourse(courseName).then(function(response){
      console.log(response);
      ac.passedOrFail = true;
      ac.fail = false;
      ac.success = true;
      ac.disableSave = false;
    }, function(error){
      console.log(error);
      ac.passedOrFail = false;
      ac.success = false;
      ac.fail = true;
      ac.disableSave = true;
    });
  }

  function addedCourse(courseValue){
    apiService.addCourse(courseValue).then(function(response){
      ac.course = "";
      swalert.successAlert(response.data.message);
      // $scope.$emit('reload_department_list');
    }, function(error){
      console.log(error);
      swalert.errorAlert(response.data.message);
    });
  }

}]);
  
app.factory('debounce', function($timeout) {
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            timeout = $timeout(function () { 
                callback.apply(this, arguments); 
            }, interval);
        };
    }; 
});