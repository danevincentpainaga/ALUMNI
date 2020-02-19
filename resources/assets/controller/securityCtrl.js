'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:securityCtrl
 * @description
 * # securityCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('securityCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var sc = this;
    sc.updating_status = "Update";
    sc.required=true;

    console.log($rootScope.id);
    sc.updatePassword = function(){
      if(sc.c_password && sc.newpassword){
        sc.updating_status = "Updating...";
        if(sc.newpassword == sc.repassword){
          sc.updating_status = "Updating...";
          var credentials = {
              id: $rootScope.id,
              password: sc.c_password,
              newpassword: sc.newpassword,
            }
          updatedUserPassword(credentials);
          console.log(credentials);
        }
        else
        {
          sc.updating_status = "Update";
          sc.password_not_matched = true;
        }
      }
    }

    function updatedUserPassword(credentials){
      apiService.updatePassword(credentials).then(function(response){
        clearInputs();
        swalert.successAlert('Password updated!');
        sc.required=false;
      }, function(error){
        clearInputs();
        console.log(error);
        sc.current_password_incorrect = true;
        sc.required=true;
      });
    }

    function clearInputs(){
      sc.updating_status = "Update";
      sc.c_password = "";
      sc.newpassword = "";
      sc.repassword ="";  
    }
}]);