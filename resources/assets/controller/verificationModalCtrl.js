'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:verificationModalCtrl
 * @description
 * # verificationModalCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('verificationModalCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var vm = this;
    vm.btnMessage = 'Send';

    vm.sendVerification = function(){
      if (vm.student_id_number && vm.email) {
        let account_details = {
          'student_id_number': vm.student_id_number,
          'email': vm.email,
          'verification_at': moment().format('YYYY-MM-DD HH:m:ss')
        };
        vm.btnMessage = 'Sending verification link...';
        sendVerificationLink(account_details);
        console.log(account_details);
      }
    }

    function sendVerificationLink(accountDetails) {
      apiService.sendVerificationLink(accountDetails).then(function(response){
        vm.verification_sent = true;
        vm.verification_failed = false;
        vm.verification_success = true;
        console.log(response.data);
        vm.btnMessage = 'Send';
        vm.student_id_number = "";
        vm.email = "";
      }, function(error){
        vm.verification_success = false;
        vm.verification_failed = true;
        console.log(error);
        vm.btnMessage = 'Send';
      });
    }

}]);