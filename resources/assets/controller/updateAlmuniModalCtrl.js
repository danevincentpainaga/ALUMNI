'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:updateAlmuniModalCtrl
 * @description
 * # updateAlmuniModalCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('updateAlmuniModalCtrl',['$scope', '$rootScope', '$cookies','$window', '$q', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $q, $location, $timeout, apiService, swalert) {


    var uc = this;

    uc.section_list =["A","B","C","D","E","F","G","H","I", "J", "K", "L", "M", "N", "O", "P"];

    $scope.$on('broadcastedAlumniDetailsFromMainCtrl', function(val, obj){
      uc.alumni = obj;
      app.constant('oldata', obj);
      $q.all([apiService.getCourses(obj.u_departmentId)]).then(function(response){
        uc.courses = response[0].data;
        giveInitialValueToCourse(obj.u_courseId);
        uc.section = obj.section;
        uc.gender = obj.gender;
        console.log(obj);
        departments("*");
      });

    });

    uc.closeModal = function(){
      alert();
      console.log(oldata);
    }

    uc.selectDepartment = function(){
      courses(uc.selectedDepartment.department_id);
    }

    uc.updateAlumniDetails = function(){
      console.log("testing");
      if (
            uc.alumni.firstname && uc.alumni.lastname && uc.alumni.middlename 
            && uc.alumni.contact_no && uc.gender && uc.alumni.birthdate && uc.alumni.address 
            && uc.alumni.permanent_address && uc.alumni.email && uc.alumni.student_id_number
            && uc.alumni.year_graduated && uc.selectedDepartment && uc.selectedCourse
         ) {
              uc.save_status = "Updating...";
              let adminDetails = {
                id: uc.alumni.id,
                alumni_id: uc.alumni.alumni_id,
                lastname: uc.alumni.lastname,
                firstname: uc.alumni.firstname,
                middlename: uc.alumni.middlename,
                contact_no: uc.alumni.contact_no,
                gender: uc.gender,
                birthdate: uc.alumni.birthdate,
                address:uc.alumni.address,
                permanent_address: uc.alumni.permanent_address,
                email:uc.alumni.email,
                student_id_number: uc.alumni.student_id_number,
                u_courseId: uc.selectedCourse.course_id,
                u_departmentId: uc.selectedDepartment.department_id,
                year_graduated: uc.alumni.year_graduated,
                section: uc.section,
                user_status: 'Activated',
                user_type: 'admin'
              };
              console.log(uc.selectedDepartment.department_id,);
              updateAlumniDetails(adminDetails);
            }
    }

    function updateAlumniDetails(alumniDetails){
      apiService.updateAlumniDetails(alumniDetails).then(function(response){
        console.log(response);
        swalert.successAlert(response.data.message);
        uc.saving = false;
        uc.save_status = "Save";
      }, function(error){
        console.log(error);
      });
    }

    function courses(deptId) {
      apiService.getCourses(deptId).then(function(response){
        uc.courses = response.data; 
        uc.selectedCourse = response.data[0];
      }, function(error){
        console.log(error);
      });
    }

    function departments(did) {
      uc.isLoading = true;
      apiService.getDepartments(did).then(function(response){
        uc.isLoading = false;
        uc.departments = response.data;
        giveInitialValueToDept(response.data);
      }, function(error){
        console.log(error);
      });
    }

    function giveInitialValueToCourse(courseId){
      angular.forEach(uc.courses, function(val, i){
        courseId == val.course_id ? uc.selectedCourse = val : null;
      });
    }

    function giveInitialValueToDept(dept){
      angular.forEach(dept, function(val, i){
          val.department_id == uc.alumni.u_departmentId ? uc.selectedDepartment = val : null;
      });
    }

}]);
