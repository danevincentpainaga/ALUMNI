'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:courseCtrl
 * @description
 * # courseCtrl
 * Controller of the PPMS
 */
var app = angular.module('myApp')
  app.controller('courseCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var c = this;
  var courseId;
  c.save_status = "save";
  c.updating = false;

  courses($rootScope.departmentId);
  
  c.edit = function(courseObject) {
    c.selectedCourse = angular.copy(courseObject);
    c.course = courseObject;
    courseId = courseObject.course_id;
    c.editing = true;
    c.disableDelete = true;
  }

  c.cancelEdit = function(){
    c.editing = false;
    c.disableDelete = false;
    if (c.selectedCourse.course_name != c.course.course_name)
            c.course.course_name = c.selectedCourse.course_name; 
  }

  c.update = function(courseName){
    c.save_status = "Saving...";
    var updatedCourseName = {
      course_id: courseId,
      course_name: courseName.toUpperCase()
    };
    c.updating = true;
    c.disableDelete = false;
    updateCourse(updatedCourseName);
  }

  c.deleteCourse = function(delCourse){
    swalert.deleteInfo(delCourse, removeCourse);
  }

  function courses(deptId) {
    apiService.getCourses(deptId).then(function(response){
      c.courses = response.data;
      console.log(response.data);
    }, function(error){
      console.log(error);
    });
  }

  function updateCourse(updatedDetails) {
    apiService.updateCourse(updatedDetails).then(function(response){
      c.editing = false;
      c.updating = false;
      swalert.successInfo(response.data.message, 'success', 3000);
      c.save_status = "save";
    }, function(error){
      console.log(error);
      c.message = error.data;
    });    
  }

  function removeCourse(courseObj){
    apiService.removeCourse(courseObj).then(function(response){
      c.courses.splice(c.courses.indexOf(courseObj), 1);
      swalert.successInfo(response.data.message, 'success', 3000);
    }, function(error){
      console.log(error);
      checkIntegrityError(error.status);
    });
  }

  function checkIntegrityError(constraints){
    constraints == 500 ? 
    swalert.errorAlert('Cannot delete or update parent row. This course name is being use.') : swalert.errorAlert('Failed! retry again.');
  }

}]);

