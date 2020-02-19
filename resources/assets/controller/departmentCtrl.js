'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:departmentCtrl
 * @description
 * # departmentCtrl
 * Controller of the PPMS
 */
var app = angular.module('myApp')
  app.controller('departmentCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var dc = this;
  var departmentId;
  dc.save_status = "save";
  dc.updating = false;

  departments();
  
  dc.edit = function(deptObject) {
    dc.selectedDept = angular.copy(deptObject);
    dc.department = deptObject;
    departmentId = deptObject.department_id;
    dc.editing = true;
    dc.disableDelete = true;
  }

  dc.cancelEdit = function(){
    dc.editing = false;
    dc.disableDelete = false;
    if (dc.selectedDept.department_name != dc.department.department_name)
            dc.department.department_name = dc.selectedDept.department_name 
  }

  dc.update = function(departmentName){
    dc.save_status = "Saving...";
    var updatedDeptName = {
      department_id: departmentId,
      department_name: departmentName.toUpperCase()
    };
    dc.updating = true;
    dc.disableDelete = false;
    updateDepartment(updatedDeptName);
  }

  dc.deleteDepartment = function(delDepartment){
    swalert.deleteInfo(delDepartment, removeDepartment);
  }

  function departments() {
    apiService.getDepartments().then(function(response){
      dc.departments = response.data;
    }, function(error){
      console.log(error);
    });
  }

  function updateDepartment(updatedDetails) {
    apiService.updateDepartment(updatedDetails).then(function(response){
      dc.editing = false;
      dc.updating = false;
      swalert.successInfo(response.data.message, 'success', 3000);
      dc.save_status = "save";
    }, function(error){
      console.log(error);
      dc.message = error.data;
    });    
  }

  function removeDepartment(departmentObj){
    apiService.removeDepartment(departmentObj).then(function(response){
      dc.departments.splice(dc.departments.indexOf(departmentObj), 1);
      swalert.successInfo(response.data.message, 'success', 3000);
    }, function(error){
      console.log(error);
      checkIntegrityError(error.status);
    });
  }

  function checkIntegrityError(constraints){
    constraints == 500 ? 
    swalert.errorAlert('Cannot delete or update parent row. This department name is being use.') : swalert.errorAlert('Failed! retry again.');
  }

}]);
