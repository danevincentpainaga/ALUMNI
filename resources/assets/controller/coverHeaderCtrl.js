'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:coverHeaderCtrl
 * @description
 * # coverHeaderCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('coverHeaderCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var ch = this;
    getLoggedUser($rootScope.id);

    $scope.$on('newppFromMainCtrl', function(val, obj){
      ch.profile_pic = obj;
    });

	function getLoggedUser(id){
		apiService.getUserProfile(id).then(function(response){
			ch.profile_pic = response.data[0].photo;
			$scope.$emit('pp', response.data[0].photo);
		}, function(err){
			console.log(err);
		});
	}

}]);

app.filter('checkPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    else{
      return 'user.jpg';
    }
  }
});

