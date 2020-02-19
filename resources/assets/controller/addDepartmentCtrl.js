'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:addDepartmentCtrl
 * @description
 * # addDepartmentCtrl
 * Controller of the PPMS
 */
var app = angular.module('myApp')
  app.controller('addDepartmentCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert', 'debounce',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, debounce) {

  var ad = this;
  ad.disableSave = true;

  $scope.$watch('ad.department', debounce(function() {
     console.log(ad.department);
     if(!ad.department){
        ad.passedOrFail = null;
        ad.success = false;
        ad.fail = false;
        ad.disableSave = true;
     }
     else
     {
        validateDepartmentIfExist(ad.department);
     }
  },500), true);
 
  ad.addDepartment = function(deptValue){
    let deptVal = { department_name: deptValue.toUpperCase() };
    if(deptValue && ad.success == true){
      swalert.saveAlert(deptVal, addedDepartment);
    }
  }

  ad.closeModal = function(){
    ad.department = "";
    ad.passedOrFail = null;
    ad.success = false;
    ad.fail = false;
    ad.disableSave = true;
  }

  function validateDepartmentIfExist(deptName){
    apiService.validateDepartment(deptName).then(function(response){
      console.log(response);
      ad.passedOrFail = true;
      ad.fail = false;
      ad.success = true;
      ad.disableSave = false;
    }, function(error){
      console.log(error);
      ad.passedOrFail = false;
      ad.success = false;
      ad.fail = true;
      ad.disableSave = true;
    });
  }

  function addedDepartment(deptValue){
    apiService.addDepartment(deptValue).then(function(response){
      ad.department = "";
      swalert.successAlert(response.data.message);
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