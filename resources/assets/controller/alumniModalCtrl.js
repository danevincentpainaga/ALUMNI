'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('alumniModalCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {


    var ac = this;
    ac.save_status = "Save";
    departments($rootScope.departmentId);
    courses($rootScope.departmentId);

    ac.section_list =["A","B","C","D","E","F","G","H","I"];

    ac.saveAlumniDetails = function(){
      if (
            ac.alumni.firstname && ac.alumni.lastname && ac.alumni.middlename 
            && ac.alumni.contact_no && ac.gender && ac.birthdate && ac.alumni.address 
            && ac.alumni.permanent_address && ac.alumni.email && ac.alumni.student_id_number
            && ac.alumni.year_graduated && ac.selectedDepartment && ac.selectedCourse
         ) {
              ac.save_status = "Saving...";
              ac.saving = true;
              let alumniDetails = {
                lastname: ac.alumni.lastname,
                firstname: ac.alumni.firstname,
                middlename: ac.alumni.middlename,
                contact_no: ac.alumni.contact_no,
                gender: ac.gender,
                birthdate: ac.birthdate,
                address:ac.alumni.address,
                permanent_address: ac.alumni.permanent_address,
                userDetails:[{
                                email:ac.alumni.email,
                                student_id_number: ac.alumni.student_id_number,
                                u_courseId: ac.selectedCourse.course_id,
                                u_departmentId: ac.selectedDepartment.department_id,
                                year_graduated: ac.alumni.year_graduated,
                                section: ac.section,
                                user_status: 'Activated',
                                user_type: ac.user_type
                              }],    
              };
              console.log(alumniDetails);
              addNewAlumni(alumniDetails);
            }
    }

    function addNewAlumni(alumniDetails){
      apiService.addNewAlumni(alumniDetails).then(function(response){
        console.log(response);
        swalert.successAlert(response.data.message);
        ac.alumni = {};
        ac.saving = false;
        ac.save_status = "Save";
      }, function(error){
        console.log(error);
      });
    }

    function departments(did) {
      ac.isLoading = true;
      apiService.getDepartments(did).then(function(response){
        ac.isLoading = false;
        ac.departments = [response.data];
        giveInitialValueToDept([response.data]);
      }, function(error){
        console.log(error);
      });
    }

    function courses(deptId) {
      apiService.getCourses(deptId).then(function(response){
        ac.courses = response.data;
      }, function(error){
        console.log(error);
      });
    }

    function giveInitialValueToDept(dept){
      let auth = $cookies.getObject('auth')
      angular.forEach(dept, function(val, i){
        if (auth) {
          auth.u_departmentId == val.u_departmentId ? ac.selectedDepartment = val : null;
        }
      });
    }

}]);
