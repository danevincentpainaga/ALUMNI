'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('addAdminModalCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {


    var am = this;
    am.save_status = "Save";
    am.section_list =["A","B","C","D","E","F","G","H","I"];
    departments($rootScope.departmentId);
    courses($rootScope.departmentId);

    am.saveAdminDetails = function(){
      if (
            am.alumni.firstname && am.alumni.lastname && am.alumni.middlename 
            && am.alumni.contact_no && am.gender && am.alumni.birthdate && am.alumni.address 
            && am.alumni.permanent_address && am.alumni.email && am.alumni.student_id_number
            && am.alumni.year_graduated && am.selectedDepartment && am.selectedCourse
         ) {
            am.save_status = "Saving...";
              let adminDetails = {
                lastname: am.alumni.lastname,
                firstname: am.alumni.firstname,
                middlename: am.alumni.middlename,
                contact_no: am.alumni.contact_no,
                gender: am.gender,
                birthdate: am.alumni.birthdate,
                address:am.alumni.address,
                permanent_address: am.alumni.permanent_address,
                userDetails:[{
                                email:am.alumni.email,
                                student_id_number: am.alumni.student_id_number,
                                u_courseId: am.selectedCourse.course_id,
                                u_departmentId: am.selectedDepartment.department_id,
                                year_graduated: am.alumni.year_graduated,
                                section: am.section,
                                user_status: 'Activated',
                                user_type: 'admin'
                              }],    
              };
              addNewAdmin(adminDetails);
            }
    }

    function addNewAdmin(adminDetails){
      apiService.addNewAdmin(adminDetails).then(function(response){
        console.log(response);
        swalert.successAlert(response.data.message);
        am.alumni = {};
        am.saving = false;
        am.save_status = "Save";
      }, function(error){
        console.log(error);
      });
    }

    function departments(did) {
      am.isLoading = true;
      apiService.getDepartments(did).then(function(response){
        am.isLoading = false;
        am.departments = [response.data];
        giveInitialValueToDept([response.data]);
      }, function(error){
        console.log(error);
      });
    }

    function courses(deptId) {
      apiService.getCourses(deptId).then(function(response){
        am.courses = response.data;
      }, function(error){
        console.log(error);
      });
    }

    function giveInitialValueToDept(dept){
      let auth = $cookies.getObject('auth')
      angular.forEach(dept, function(val, i){
        if (auth) {
          auth.u_departmentId == val.u_departmentId ? am.selectedDepartment = val : null;
        }
      });
    }

}]);
