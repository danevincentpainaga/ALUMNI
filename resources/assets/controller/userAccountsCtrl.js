'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:userAccountsCtrl
 * @description
 * # userAccountsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('userAccountsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var u = this;
    users();

    $scope.$on('reloadedUsers', function(){
      users();
    });

    u.updateUser = function(userDetails){
      $scope.$emit('user_details_from_userAccountsCtrl', userDetails);
    }

    function users() {
      apiService.getUsers().then(function(response){
        u.users_list = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);

app.directive('userStatus', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var stats = attrs.status;
          if(stats=="Activated"){
            elem.addClass('activated-user');
          }
          else if(stats=="De-Activated"){
            elem.addClass('deactivated-user');
          }
      }
    }
 });