'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:userAccountsCtrl
 * @description
 * # userAccountsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('updateUsersCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var uc = this;

    $scope.$on('user_details_from_mainCtrl_to_updateUsersCtrl', function(v, obj){
      departments(obj.department_name);
      courses(obj.u_departmentId, obj.u_courseId);
      uc.id = obj.id;
      uc.student_id_number = obj.student_id_number;
      uc.email = obj.email;
      uc.user_status = obj.user_status;
      uc.alumni_name = obj.firstname+" "+obj.middlename+" "+obj.lastname;
    });

    uc.updateUserDetails = function(){
      let updates = {
        "u_departmentId": uc.selectedDepartment.department_id,
        "u_courseId": uc.selectedCourse.course_id,
        "user_status": uc.user_status,
        "id": uc.id
      };
      updateUser(updates);
    }

    function selectInitialDepartmentValue(department, dept){
      angular.forEach(department, function(val, i){
        if (val.department_name === dept) {
          uc.selectedDepartment = val;
        }
      });
    }

    function selectInitialCourseValue(course, courseId){
      angular.forEach(course, function(val, i){
        if (val.course_id === courseId) {
          uc.selectedCourse = val;
        }
      });
    }

    function departments(dept) {
      apiService.getDepartments().then(function(response){
        uc.departments = response.data;
        selectInitialDepartmentValue(response.data, dept);
      }, function(error){
        console.log(error);
      });
    }

    function courses(deptId, courseId) {
      apiService.getCourses(deptId).then(function(response){
        uc.courses = response.data;
        selectInitialCourseValue(response.data, courseId);
      }, function(error){
        console.log(error);
      });
    }

    function updateUser(updates){
      apiService.updateUser(updates).then(function(response){
        $scope.$emit('onreloadUsers');
        swalert.successAlert(response.data.message);
      }, function(err){
        console.log(err);
      });
    }
}]);
