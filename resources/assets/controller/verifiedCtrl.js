'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:verificationModalCtrl
 * @description
 * # verificationModalCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('verifiedCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', '$stateParams', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, $stateParams, apiService, swalert) {

    var vc = this;
    vc.buttonMessage = "Verify";
    
    if ($stateParams.verification) {
      console.log($stateParams.verification);
      console.log($stateParams.id);
    }
    else
    {
      $location.path('/');
    }

    vc.verifyAndRedirect = function(){
      vc.buttonMessage = "Verifying...";
      if (vc.password === vc.c_password) {
        let verification = {
          'verification_date': $stateParams.verification,
          'password':vc.password,
          'id': $stateParams.id
        };
        console.log(verification);
        saveVerificationDate(verification);
      }
      else{
        swalert.errorAlert('Password not matched!');
        vc.buttonMessage = "Verify";
      }
    }

    function saveVerificationDate(verificationDate) {
      apiService.saveVerificationDate(verificationDate).then(function(response){
        console.log(response);
        vc.verifiedAccount = true;
        vc.buttonMessage = "Redirecting...";
        vc.verifying = true;
        $cookies.putObject('auth', response.data);
        $timeout(function() { $location.path('/account/'+response.data.account_name); $scope.$emit("Authenticated");});
      }, function(err){
        console.log(err);
        vc.buttonMessage = "Verify";
      });
    }    

}]);