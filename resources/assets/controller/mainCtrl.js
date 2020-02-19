'use strict';
/**
 * @ngdoc function
 * @name mytodoApp.controller:mainCtrl
 * @description
 * # mainCtrl
 * Controller of the PPMS
 */

var app = angular.module('myApp')
	app.controller('mainCtrl',['$scope', '$rootScope', '$location', '$state', '$http','$filter', '$timeout', '$cookies', '$window', '$stateParams', 'swalert', 'fileReader', 'apiService',
		function ($scope, $rootScope, $location, $state, $http, $filter, $timeout, $cookies, $window, $stateParams, swalert, fileReader, apiService) {

  $scope.$on('pp', function(val, obj){
    if (obj) {
      $scope.imageSrc = obj;
      $scope.modalImage = 'uploads/'+obj;
      $scope.oldImage = 'uploads/'+obj;
    }
  });

	$scope.getTheFiles  = function(file){
		$scope.file = file[0];
		var formdata = new FormData();
        formdata.append('file', file[0]);
        formdata.append('id', $rootScope.id);
      	fileReader.readAsDataUrl(file[0], $scope)
        	.then(function(result) {
    				$timeout(function() {
    					$scope.modalImage = result;
    					$scope.data = formdata;
    				});
        });
	}

	$scope.uploadFile = function(){
	    apiService.uploadProfilePic($scope.data).then(function(response){
	     	console.log(response);
	    }, function(error){
	      console.log(error);
	    });
	}

	$scope.cancelUpload = function(){
		$scope.modalImage = $scope.oldImage;
	}

	$scope.redirectToAccount = function(){
		$state.go('account', {"alumni_name": $rootScope.accountName});
	}

	$scope.navigate = function(destination){
		$location.path(destination);
	}

	$scope.isActivated = function(destination){
		return destination == $location.path();
	}

	$scope.$on('Authenticated', function(){
		swalert.successInfo("<label>Welcome "+$cookies.getObject('auth').name+"!</label>", 'success', 2000);
	});

	$scope.logout= function(){
		$window.location.reload();
		$cookies.remove('auth');
	}
	
	$scope.$on('user_details_from_userAccountsCtrl', function(val, obj){
		$scope.$broadcast('user_details_from_mainCtrl_to_updateUsersCtrl', obj);
	});

	$scope.$on('success_post_from_addeventCtrl', function(val, obj){
		$scope.$broadcast('success_post_from_mainCtrl_to_manageEventCtrl', obj);
	});

  $scope.$on('alumniDetailsFromAlumniCtrl', function(val, obj){
    $scope.$broadcast('broadcastedAlumniDetailsFromMainCtrl', obj);
  });

  $scope.$on('onreloadUsers', function(){
    $scope.$broadcast('reloadedUsers');
  });
  
}]);

app.filter('formatedDate', function(){
  return function(stringDate){
    return moment(stringDate).format('MMMM Do YYYY, h:mm:ss A');
  }
});

app.directive('eventType', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var etype = attrs.etype;
          if(etype === "Job Opportunities"){
            elem.addClass('badge-success');
          }
          else{
            elem.addClass('badge-info');
          }
      }
    }
 });

app.directive('jobStatus', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var stats = attrs.status;
          if(stats){
          	$('#job').text("Employed");
            elem.addClass('employed');
          }
          else{
          	$('#job').text("Unemployed");
            elem.addClass('unemployed');
          }
      }
    }
});
app.directive('resize', function ($window) {
    return function (scope, element) {
        var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.windowHeight = newValue.h;
            scope.windowWidth = newValue.w;
            
            scope.style = function () {
                return {
                  'min-height': (newValue.h - 67) + 'px',
                  'max-height': (newValue.h - 67) + 'px'
                };
            };
        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
});

	// app.directive('fileModel', ['$parse', function ($parse) {
	// 	return {
	// 	   restrict: 'A',
	// 	   link: function(scope, element, attrs) {
	// 	      var model = $parse(attrs.fileModel);
	// 	      var modelSetter = model.assign;
		      
	// 	      element.bind('change', function() {
	// 	         scope.$apply(function() {
	// 	            modelSetter(scope, element[0].files[0]);
	// 	            console.log(element[0].files[0]);
	// 	         });
	// 	      });
	// 	   }
	// 	};
	// }]);
//   app.directive("ngFileSelect", function(fileReader, $timeout) {
//     return {
//       scope: {
//         ngModel: '='
//       },
//       link: function($scope, el) {
//         function getFile(file) {
          // fileReader.readAsDataUrl(file, $scope)
          //   .then(function(result) {
          //     $timeout(function() {
          //       $scope.ngModel = result;
          //     });
          //   });
//         }

//         el.bind("change", function(e) {
//           var file = (e.srcElement || e.target).files[0];
//           getFile(file);
//         });
//       }
//     };
//   });

// app.factory("fileReader", function($q, $log) {
//   var onLoad = function(reader, deferred, scope) {
//     return function() {
//       scope.$apply(function() {
//         deferred.resolve(reader.result);
//       });
//     };
//   };

//   var onError = function(reader, deferred, scope) {
//     return function() {
//       scope.$apply(function() {
//         deferred.reject(reader.result);
//       });
//     };
//   };

//   var onProgress = function(reader, scope) {
//     return function(event) {
//       scope.$broadcast("fileProgress", {
//         total: event.total,
//         loaded: event.loaded
//       });
//     };
//   };

//   var getReader = function(deferred, scope) {
//     var reader = new FileReader();
//     reader.onload = onLoad(reader, deferred, scope);
//     reader.onerror = onError(reader, deferred, scope);
//     reader.onprogress = onProgress(reader, scope);
//     return reader;
//   };

//   var readAsDataURL = function(file, scope) {
//     var deferred = $q.defer();

//     var reader = getReader(deferred, scope);
//     reader.readAsDataURL(file);

//     return deferred.promise;
//   };

//   return {
//     readAsDataUrl: readAsDataURL
//   };
// });



app.directive('ngFiles', ['$parse', function ($parse) {

    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ]);

app.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});

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