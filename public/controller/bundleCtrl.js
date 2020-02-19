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

'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:addCourseCtrl
 * @description
 * # addCourseCtrl
 * Controller of the PPMS
 */
var app = angular.module('myApp')
  app.controller('addCourseCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert', 'debounce',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, debounce) {

  var ac = this;
  ac.disableSave = true;

  $scope.$watch('ac.course', debounce(function() {
     console.log(ac.course);
     if(!ac.course){
        ac.passedOrFail = null;
        ac.success = false;
        ac.fail = false;
        ac.disableSave = true;
     }
     else
     {
        validateCourseIfExist(ac.course);
     }
  },500), true);
 
  ac.addCourse = function(courseValue){
    let cValue = { course_name: courseValue.toUpperCase(), c_departmentId: $rootScope.departmentId };
    if(cValue && ac.success == true){
      swalert.saveAlert(cValue, addedCourse);
    }
  }

  ac.closeModal = function(){
    ac.course = "";
    ac.passedOrFail = null;
    ac.success = false;
    ac.fail = false;
    ac.disableSave = true;
  }

  function validateCourseIfExist(courseName){
    apiService.validateCourse(courseName).then(function(response){
      console.log(response);
      ac.passedOrFail = true;
      ac.fail = false;
      ac.success = true;
      ac.disableSave = false;
    }, function(error){
      console.log(error);
      ac.passedOrFail = false;
      ac.success = false;
      ac.fail = true;
      ac.disableSave = true;
    });
  }

  function addedCourse(courseValue){
    apiService.addCourse(courseValue).then(function(response){
      ac.course = "";
      swalert.successAlert(response.data.message);
      // $scope.$emit('reload_department_list');
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
'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('addEventCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var em = this;

    em.postEvent = function(){
      let d = new Date(em.eventdate._d.toString());
      let date_posted = formatDate(new Date());
      let postedEvent = {
        'event_type':em.event_type,
        'event_datetime':d.toISOString(),
        'event_message':em.event,
        'e_id': $rootScope.id,
        'date_posted': date_posted,
        'event_status': 'approved'
      };
      postEvents(postedEvent);
      // console.log(d.toISOString());
      // console.log(d.getFullYear()+""+d.getMonth()+""+d.getDate());
      // let newdate = moment(new Date('August 6, 2019')).format('YYYYMMDD');
      // console.log(moment(new Date('August 6, 2019')).format('YYYYMMDD'));
      // console.log(moment(newdate, "YYYYMMDD").fromNow());
      // console.log(moment().startOf('hour').fromNow());
    }

    function postEvents(event){
      apiService.postEvents(event).then(function(response){
        swalert.successAlert(response.data.message);
        $scope.$emit('success_post_from_addeventCtrl', 'success');
        em.event_type = "";
        em.event = "";
        em.eventdate = "";
      }, function(err){
        console.log(err);
      });
    }

    function formatDate(stringDate){
        var month = new Array();
        month[0] = "January"; month[1] = "February"; month[2] = "March"; 
        month[3] = "April";month[4] = "May"; month[5] = "June"; month[6] = "July";
        month[7] = "August"; month[8] = "September"; month[9] = "October";
        month[10] = "November"; month[11] = "December";

      var date = new Date(stringDate);
      return month[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
    }

}]);
'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('alumniCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var a = this;
    alumni();

    a.emitAlumniDetailsToUpdate = function(alumniDetails){
      $scope.$emit('alumniDetailsFromAlumniCtrl', alumniDetails);
    }

    function alumni() {
      apiService.getAlumni().then(function(response){
        a.alumni_list = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);

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

'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:courseCtrl
 * @description
 * # courseCtrl
 * Controller of the PPMS
 */
var app = angular.module('myApp')
  app.controller('courseCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var c = this;
  var courseId;
  c.save_status = "save";
  c.updating = false;

  courses($rootScope.departmentId);
  
  c.edit = function(courseObject) {
    c.selectedCourse = angular.copy(courseObject);
    c.course = courseObject;
    courseId = courseObject.course_id;
    c.editing = true;
    c.disableDelete = true;
  }

  c.cancelEdit = function(){
    c.editing = false;
    c.disableDelete = false;
    if (c.selectedCourse.course_name != c.course.course_name)
            c.course.course_name = c.selectedCourse.course_name; 
  }

  c.update = function(courseName){
    c.save_status = "Saving...";
    var updatedCourseName = {
      course_id: courseId,
      course_name: courseName.toUpperCase()
    };
    c.updating = true;
    c.disableDelete = false;
    updateCourse(updatedCourseName);
  }

  c.deleteCourse = function(delCourse){
    swalert.deleteInfo(delCourse, removeCourse);
  }

  function courses(deptId) {
    apiService.getCourses(deptId).then(function(response){
      c.courses = response.data;
      console.log(response.data);
    }, function(error){
      console.log(error);
    });
  }

  function updateCourse(updatedDetails) {
    apiService.updateCourse(updatedDetails).then(function(response){
      c.editing = false;
      c.updating = false;
      swalert.successInfo(response.data.message, 'success', 3000);
      c.save_status = "save";
    }, function(error){
      console.log(error);
      c.message = error.data;
    });    
  }

  function removeCourse(courseObj){
    apiService.removeCourse(courseObj).then(function(response){
      c.courses.splice(c.courses.indexOf(courseObj), 1);
      swalert.successInfo(response.data.message, 'success', 3000);
    }, function(error){
      console.log(error);
      checkIntegrityError(error.status);
    });
  }

  function checkIntegrityError(constraints){
    constraints == 500 ? 
    swalert.errorAlert('Cannot delete or update parent row. This course name is being use.') : swalert.errorAlert('Failed! retry again.');
  }

}]);


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


'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('dashboardCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var db = this;
    getEmployedUnemployedDepartments();
    // displayDataToGraph();

    function displayDataToGraph() {
      apiService.getDepartments().then(function(response){
        // $timeout(function() {
          db.labels1 = [];
          angular.forEach(response.data, function(val, i){
            db.labels1.push(val.department_name);
          });

          db.series1 = ['Employed', 'Unemployed'];
          db.data1 = [
            [500, 300,700],
            [200, 100,500],
          ];
        // }, 1000 );
      }, function(error){
        console.log(error);
      });
    }

    db.labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October","November","December"];
    db.series = ['Series A'];

    db.data = [
      [65, 59, 40, 81, 56, 55, 40],
    ];

    db.onClick = function (points, evt) {
      console.log(points, evt);
    };


    function getEmployedUnemployedDepartments(){
      apiService.getEmployedUnemployedDepartments().then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });      
    }


    // db.graph = {
    //   'max-height': $scope.windowHeight+'px'
    // };
    // Simulate async data update
    // $timeout(function () {
    // db.data = [
    //   [28, 48, 40, 19, 86, 27, 90],
    //   [65, 59, 80, 81, 56, 55, 40]
    // ];
    // }, 3000);
}]);

app.directive('graph-style', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        let mh = attrs.maxheight;
        elem.addClass('graphStyle');
      }
    }
 });
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

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:fellowsCtrl
 * @description
 * # fellowsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('fellowsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$stateParams', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $stateParams, $timeout, apiService, swalert) {

    var f = this;
    var alumniCred = {
      'u_alumniId': $rootScope.u_alumniId,
      'u_departmentId': $rootScope.departmentId,
      'u_courseId': $rootScope.courseId,
      'year_graduated': $rootScope.year_graduated,
      'section': $rootScope.section,
    }

    fellowClassmates(alumniCred);

    f.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
    }


    function fellowClassmates(alumniCred) {
      apiService.getfellowClassmates(alumniCred).then(function(response){
        f.classmates = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);
'use strict';

/**
 * @ngdoc function
 * @name mytodoApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the mytodoApp
 */ 
var app = angular.module('myApp')
  app.controller('loginCtrl',['$scope', '$rootScope', '$cookies', '$window', '$location', '$timeout', 'apiService', 'swalert',
  function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

  var lg = this;
  lg.valid= true;
  lg.buttonMessage = 'Sign In';
  lg.loginBtn = false;

  lg.login =function(){
    if(!lg.email || !lg.password){
      console.log('unAuthenticated');
    }else{
      lg.loginBtn = true;
      lg.buttonMessage = 'Signing In...';
      
      swalert.successInfo("<label><i class='fa fa-spinner fa-spin'></i>&nbsp;Checking Identity...</label>", 'info', );
      var credentials = {
        email: lg.email,
        password: lg.password
      }

      apiService.validateLogin(credentials)
        .then(function(response){
          $cookies.putObject('auth', response.data);
          console.log(response);
          $timeout(function() { $location.path('/account/'+response.data.account_name); $scope.$emit("Authenticated"); lg.loginBtn = false;});
      }, function(err){
        console.log(err);
        err.data.error === "Unauthorised" ?
          swalert.successInfo("<label class='red'>Incorrect Username/password!</label>", 'error', ) : 
          swalert.successInfo("<label class='red'>"+err.data.error+"!</label>", 'error', );
          lg.buttonMessage = 'Sign In';
          lg.loginBtn = false;
      });
    }
  }


}]);

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
'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:manageEventsCtrl
 * @description
 * # manageEventsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('manageEventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert', 'debounce', 
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert, debounce) {

    var me = this;
    me.update_status = "Update";
    watchSearched();

    $scope.$on('success_post_from_mainCtrl_to_manageEventCtrl', function(){
      getEvents();
    });

    me.updateEvent = function(){
      me.update_status = "Updating...";
      let d = new Date(me.eventdate._d.toString());
      let updatedEvent = {
        'event_type':me.event_type,
        'event_datetime':d.toISOString(),
        'event_message':me.event_message,
        'event_id': me.event_id,
      };
      updateEvent(updatedEvent);
    }

    me.editEvent = function(event){
      console.log(event);
      me.editingEvent = event;
      me.event_id = event.event_id;
      me.event_type = event.event_type;
      me.event_message = event.event_message;
      me.editing = true;
      me.eventdate = moment(event.event_datetime);
    }

    me.cancelEditing = function(){
      me.editing = false;
    }

    me.eventSelected = function(){
      me.selectedevent != "" ? me.eventTypeSelected = true : me.eventTypeSelected = false;
      if (me.alumni_name) {
        watchSearched();
      }
    }

    me.approvedEvents = function(event){
      let approved_event = {
        event_id: event.event_id,
        event_status: 'approved'
      };
      approvedEvents(approved_event);
    }

    me.removeEvent = function(eventDetails){
      swalert.deleteInfo(eventDetails, removePostedEvent);
    }

    function getEvents() {
      apiService.getEvents().then(function(response){
        me.events = response.data;
        console.log(response);
      }, function(error){
        console.log(error);
      });
    }

    function updateEvent(eventDetails){
      apiService.updateEvent(eventDetails).then(function(response){
        me.editing = false;
        me.update_status = "Update";
        me.editingEvent.event_message = me.event_message;
        swalert.successAlert(response.data.message);
      },function(err){
        console.log(err);
      });
    }

    function approvedEvents(approved_event){
      apiService.approvedEvents(approved_event).then(function(response){
        swalert.successAlert(response.data.message);
        getEvents();
        console.log(response);
      },function(err){
        console.log(err);
      });      
    }

    function removePostedEvent(eventDetails){
      apiService.removePostedEvent(eventDetails).then(function(response){
        me.events.splice(me.events.indexOf(eventDetails), 1);
        swalert.successAlert(response.data.message);
      },function(err){
        console.log(err);
      });
    }

    function getSearchedEvents(searchedDetails) {
      apiService.getSearchedEvents(searchedDetails).then(function(response){
        me.events = response.data;
        console.log(response);
      }, function(error){
        console.log(error);
      });
    }

    function watchSearched(){
      $scope.$watch('me.alumni_name', debounce(function(oldVal, newVal) {
        if (me.selectedevent && me.alumni_name) {
          let searched = {
            'event_type': me.selectedevent,
            'searched_name': me.alumni_name
          };
          getSearchedEvents(searched);
        }
        else{
          getEvents();
        }
      },500), true);
    }
}]);

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('myeventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var m = this;
    getEventsById($rootScope.id);
    m.event_status = "all";
    m.statuses = ["all", "approved", "pending"]

    $scope.$on('event_to_be_remove', function(val, obj){
      m.events.splice(m.events.indexOf(obj), 1);
    });

    m.selectedStatus = function(status){
      let user_event = {
        id: $rootScope.id,
        event_status: status
      };
      getEventsByStatus(user_event);
    }

    function getEventsById(id) {
      apiService.getEventsById(id).then(function(response){
        m.events = response.data;
        if (m.events.length === 0) {
          m.response_message = "No posted events yet.";
          m.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }

    function getEventsByStatus(user_event) {
      apiService.getEventsByStatus(user_event).then(function(response){
        m.events = response.data;
        if (m.events.length > 0) {
          m.empty_post = false;
        }
        else{
          m.response_message = "No "+user_event.event_status+" events";
          m.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }
    
}]);

app.directive('eventStatus', function(){
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, elem, attrs) {
        var stats = attrs.status;
          if(stats=="approved"){
            elem.addClass('badge-info');
          }
          else if(stats=="pending"){
            elem.addClass('badge-danger');
          }
      }
    }
 });

// Controller for updatePostEventCustomDirective //
app.controller('editEventCtrl', ['$scope', 'apiService', 'swalert', function($scope, apiService, swalert) {
  var e = this;
  e.update_status = "Update";

  e.editEvent = function(event){
    e.selected_event = event;
    e.event_id = event.event_id;
    e.event_type = event.event_type;
    e.event_message = event.event_message;
    e.event_editing = true;
    e.eventdate = moment(event.event_datetime);
  }

  e.cancelEditing = function(){
    e.event_editing = false;
  }

  e.updateEvent = function(){
    e.update_status = "Updating...";
    e.updating = true;
    let d = new Date(e.eventdate._d.toString());
    let updatedEvent = {
      'event_type':e.event_type,
      'event_datetime':d.toISOString(),
      'event_message':e.event_message,
      'event_id': e.event_id,
    };
    e.selected_event.event_type = e.event_type;
    e.selected_event.eventdate = d.toISOString();
    e.selected_event.event_message = e.event_message;
    updateEvent(updatedEvent);
  }

  e.removeEvent = function(eventDetails){
    swalert.deleteInfo(eventDetails, removePostedEvent);
  }

  function updateEvent(eventDetails){
    apiService.updateEvent(eventDetails).then(function(response){
      swalert.successInfo(response.data.message, 'success', 2000);
      e.event_editing = false;
      e.update_status = "Update";
      e.updating = false;
    },function(err){
      console.log(err);
    });
  }

  function removePostedEvent(eventDetails){
    apiService.removePostedEvent(eventDetails).then(function(response){
      $scope.$emit('event_to_be_remove', eventDetails );
      swalert.successInfo(response.data.message, 'success', 2000);
    },function(err){
      console.log(err);
    });
  }

}]);

app.directive('updatePostEvent', function(){
    return {
      restrict: 'E',
      scope: {
        event: '='
      },
      templateUrl:'views/edit_event_template_directive.html',
      controller: 'editEventCtrl',
      controllerAs: 'e',
    }
 });

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('profileCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var pc = this;
    pc.updatingNameAddress = "Update";
    pc.updatingProfile = "Update";
    pc.updatingJob = "Update";
    pc.add_status = "Add";
    getUserProfile($rootScope.id);
    getAlumniSkills($rootScope.u_alumniId);
    getAlumniWorkExp($rootScope.u_alumniId);
    getAlumniBusinesses($rootScope.u_alumniId);
    getAlumniEducations($rootScope.id);

    $scope.$on('educationDetailsFromEditEducationCtrl', function(val, obj){
      pc.educations.splice(pc.educations.indexOf(obj), 1);
    });

    pc.addingEducation = function(){
      pc.education_adding = true;
    }

    pc.cancelAdding = function(){
      pc.education_adding = false;
      pc.add_status = "Add";
    }

    pc.addEducation = function(){
      pc.add_status = "Saving...";
      let addedEducation = {
        'degree':pc.degree,
        'year_graduated':pc.year_graduated,
        'school':pc.school,
        'e_uid': $rootScope.id,
      };
      saveEducation(addedEducation);        
    }

    pc.showWorkExpInput = function(){
      pc.showWorkExp = true;
    }

    pc.cancelAddWorkExp = function(){
      pc.showWorkExp = false;
    }

    pc.saveWorkExperience = function(){
      let workExperience = {
        'w_company_name': pc.w_company_name,
        'w_position': pc.w_position,
        'w_aid': $rootScope.u_alumniId
      };
      saveWorkExperience(workExperience);
    }

    pc.saveBusiness = function(){
      let business = {
        'business_name': pc.business_name,
        'b_alumniId': $rootScope.u_alumniId
      };
      saveBusiness(business);      
    }

    pc.editProfileNameAddress = function(p){
      pc.p = p;
      pc.firstname = p.firstname;
      pc.middlename = p.middlename;
      pc.lastname = p.lastname;
      pc.address = p.address;
      pc.editing_profilename = true;
    }

    pc.updateNameAddress = function(){
      pc.updating_name_address = true;
      pc.updatingNameAddress = "Updating...";
      let newNameAdress = {
        'alumni_id': $rootScope.u_alumniId,
        'firstname': pc.firstname,
        'middlename': pc.middlename,
        'lastname': pc.lastname,
        'address': pc.address,
      }
      pc.p.firstname = pc.firstname;
      pc.p.middlename = pc.middlename;
      pc.p.lastname = pc.lastname;
      pc.p.address = pc.address;
      updateNameAddress(newNameAdress);
    }

    pc.editProfileDetails = function(p){
      pc.p = p;
      pc.contact_no = p.contact_no;
      pc.gender = p.gender;
      pc.birthdate = p.birthdate;
      pc.permanent_address = p.permanent_address;
      pc.editing_profile = true;
    }

    pc.updateProfile = function(){
      pc.updating_profile = true;
      pc.updatingProfile = "Updating...";
      let profileInfo = {
        'alumni_id': $rootScope.u_alumniId,
        'contact_no': pc.contact_no,
        'gender': pc.gender,
        'birthdate': pc.birthdate,
        'permanent_address': pc.permanent_address,
      }
      pc.p.contact_no = pc.contact_no;
      pc.p.gender = pc.gender;
      pc.p.birthdate = pc.birthdate;
      pc.p.permanent_address = pc.permanent_address;
      updateProfile(profileInfo);
    }

    pc.editJob = function(p){
      pc.p = p;
      pc.company = p.company;
      pc.job = p.job;
      pc.editing_job = true;
    }

    pc.updateJob = function(){
      pc.updating_job = true;
      pc.updatingJob = "Updating...";
      let job = {
        'alumni_id': $rootScope.u_alumniId,
        'company': pc.company,
        'job': pc.job
      }
      pc.p.company = pc.company;
      pc.p.job = pc.job;
      updateJob(job);
    }

    pc.showInput = function(){
      pc.show_add_input = true;
    }

    pc.showBusinessInput = function(){
      pc.show_business_input = true;
    }

    pc.addSkill = function(skill){
      addAlumniSkills({'alumniId': $rootScope.u_alumniId, 'skills': skill})
    }

    pc.cancelAddingSkill = function(){
      pc.skill = "";
      pc.show_add_input = false;
    }

    pc.cancelAddingBusiness = function(){
      pc.business_name = "";
      pc.show_business_input = false;      
    }

    pc.removeSkills = function(skill){
      swalert.deleteInfo(skill, removeAlumniSkills);
    }

    pc.removeBusiness = function(business){
      swalert.deleteInfo(business, removeBusiness);
    }

    pc.removeWorkExp = function(workExp){
      swalert.deleteInfo(workExp, removeWorkExperience);
    }

    pc.cancelNameAddressEdit = function(){
      pc.editing_profilename = false;
    }

    pc.cancelProfileEdit = function(){
      pc.editing_profile = false;
    }

    pc.cancelJobEdit = function(){
      pc.editing_job = false;
    }

    function getUserProfile(id) {
      apiService.getUserProfile(id).then(function(response){
        pc.user_profile = response.data;
        console.log(response.data);
        pc.gender = response.data.gender;
      }, function(error){
        console.log(error);
      });
    }

    function getAlumniSkills(id) {
      apiService.getAlumniSkills(id).then(function(response){
        pc.skills = response.data;
        checkIfSkillsIsEmpty(pc.skills);
      }, function(error){
        console.log(error);
      });
    }

    function updateNameAddress(newNameAdress){
      apiService.updateNameAddress(newNameAdress).then(function(response){
        console.log(response.data);
        pc.updating_name_address = false;
        pc.editing_profilename = false;
        pc.updatingNameAddress = "Update";
        swalert.successInfo(response.data.message, 'success', 2000);
      }, function(err){
        console.log(err);
      });
    }

    function updateProfile(profileInfo){
      apiService.updateProfile(profileInfo).then(function(response){
        console.log(response.data);
        pc.updating_profile = false;
        pc.editing_profile = false;
        pc.updatingProfile = "Update";
        swalert.successInfo(response.data.message, 'success', 2000);
      }, function(err){
        console.log(err);
      });
    }

    function updateJob(job){
      apiService.updateJob(job).then(function(response){
        console.log(response.data);
        pc.updating_job = false;
        pc.editing_job = false;
        pc.updatingJob = "Update";
        swalert.successInfo(response.data.message, 'success', 2000);
      }, function(err){
        console.log(err);
      });
    }

    function addAlumniSkills(alumniSkills){
      apiService.addAlumniSkills(alumniSkills).then(function(response){
        pc.skill = "";
        pc.skills.push(response.data); 
        checkIfSkillsIsEmpty(pc.skills);
        swalert.successInfo('Successful', 'success', 1000);
      }, function(err){
        console.log(err);
      });
    }

    function removeAlumniSkills(skill) {
      apiService.removeAlumniSkills(skill).then(function(response){
        console.log(response.data);
        pc.skills.splice(pc.skills.indexOf(skill), 1);
        checkIfSkillsIsEmpty(pc.skills);
        swalert.successInfo(response.data.message, 'success', 1000);
      }, function(error){
        console.log(error);
      });
    }

    function removeBusiness(business) {
      apiService.removeBusiness(business).then(function(response){
        pc.businesses.splice(pc.businesses.indexOf(business), 1);
        // checkIfSkillsIsEmpty(pc.skills);
        swalert.successInfo(response.data.message, 'success', 1000);
      }, function(error){
        console.log(error);
      });
    }

    function removeWorkExperience(workExp) {
      apiService.removeWorkExperience(workExp).then(function(response){
        console.log(response.data);
        pc.work_experiences.splice(pc.work_experiences.indexOf(workExp), 1);
        swalert.successInfo(response.data.message, 'success', 1000);
      }, function(error){
        console.log(error);
      });
    }

    function saveWorkExperience(workExp){
      apiService.saveWorkExperience(workExp).then(function(response){
        pc.work_experiences.unshift(response.data);
        swalert.successInfo('Successful', 'success', 1000);
      }, function(err){
        console.log(err);
      });
    }

    function saveBusiness(business){
      apiService.saveBusiness(business).then(function(response){
        pc.businesses.unshift(response.data);
        swalert.successInfo('Successful', 'success', 1000);
      }, function(err){
        console.log(err);
      });
    }

    function saveEducation(education){
      apiService.saveEducation(education).then(function(response){
        pc.educations.unshift(response.data);
        swalert.successInfo('Successful', 'success', 1000);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniWorkExp(aid){
      apiService.getAlumniWorkExp(aid).then(function(response){
        pc.work_experiences = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniEducations(aid){
      apiService.getAlumniEducations(aid).then(function(response){
        pc.educations = response.data;
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniBusinesses(aid){
      apiService.getAlumniBusinesses(aid).then(function(response){
        pc.businesses = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function checkIfSkillsIsEmpty(response){
      if (response.length > 0) {
        pc.emptySkills = false;
      }
      else{
        pc.emptySkills = true;
      }
    }
}]);



// Controller for updatePostEventCustomDirective //
app.controller('editEducationCtrl', ['$scope', 'apiService', 'swalert', function($scope, apiService, swalert) {
  var ec = this;
  ec.update_status = "Update";

  ec.editEducation = function(educ){
    ec.selected_education = educ;
    ec.education_id = educ.education_id;
    ec.degree = educ.degree;
    ec.school = educ.school;
    ec.year_graduated = educ.year_graduated;
    ec.education_editing = true;
  }

  ec.cancelEditing = function(){
    ec.education_editing = false;
  }

  ec.updateEducation= function(){
    ec.update_status = "Updating...";
    let updatedEducation = {
      'degree':ec.degree,
      'school':ec.school,
      'year_graduated':ec.year_graduated,
      'education_id': ec.education_id,
    };
    ec.selected_education.degree = ec.degree;
    ec.selected_education.school = ec.school;
    ec.selected_education.year_graduated = ec.year_graduated;
    updateAlumniEducation(updatedEducation);
  }

  ec.removeEducation = function(educationDetails){
    swalert.deleteInfo(educationDetails, removeEducations);
  }

  function updateAlumniEducation(educationDetails){
    apiService.updateAlumniEducation(educationDetails).then(function(response){
      swalert.successInfo(response.data.message, 'success', 2000);
      ec.education_editing = false;
      ec.update_status = "Update";
    },function(err){
      console.log(err);
    });
  }

  function removeEducations(educationDetails){
    apiService.removeEducations(educationDetails).then(function(response){
      $scope.$emit('educationDetailsFromEditEducationCtrl', educationDetails);
      swalert.successInfo(response.data.message, 'success', 2000);
    },function(err){
      console.log(err);
    });
  }

}]);

app.filter('status', function(){
  return function(status){
    if (status) {
      return status;
    }
    else{
      return 'None';
    }
  }
});

app.directive('updateEducation', function(){
    return {
      restrict: 'E',
      scope: {
        education: '='
      },
      templateUrl:'views/edit_education_template_directive.html',
      controller: 'editEducationCtrl',
      controllerAs: 'ec',
    }
 });
'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:searchAlumniCtrl
 * @description
 * # searchAlumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('searchAlumniCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$timeout', 'apiService', 'swalert', 'debounce',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $timeout, apiService, swalert, debounce) {

    var sa = this;

    $scope.$watch('sa.search_alumni', debounce(function(oldVal, newVal) {
      console.log(sa.search_alumni);
      if (sa.search_alumni) {
        getSearchedAlumni(sa.search_alumni);
      }
      else{
        sa.hasNoResults = false;
        sa.alumni_list = {};
      }
    },650), true);

    sa.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
      sa.alumni_list = {};
    }

    function getSearchedAlumni(searchName) {
      apiService.getSearchedAlumni(searchName).then(function(response){
        sa.alumni_list = response.data;
        if (sa.alumni_list.length > 0) {
          sa.hasNoResults = false;
        }
        else{
          sa.hasNoResults = true;
        }
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }
    

}]);

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
'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:timelineEventsCtrl
 * @description
 * # timelineEventsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('timelineEventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state','$timeout', 'apiService', 'socket', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $timeout, apiService, socket, swalert) {

    var t = this;
    t.co_department = [];

    for (var i = 0; i < 8; i++) {
      t.co_department.push({"photo": "user.jpg", "firstname": ""});
    }

    getCoDepartments($rootScope.departmentId);
    getEvents('approved');
    t.modalstate = false;
    t.event_type = "all";
    t.eventTypes = ["all", "Job Opportunities", "Announcement/Events"];

    socket.on('laravel_database_test-channel', function(data) {
      if (data[0].event_status === 'approved') {
        t.events.unshift(data[0]);
      }  
    });

    t.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
    }

    t.postEvent = function(){
      let date_posted = formatDate(new Date());
      if (t.type_of_event && t.event && date_posted) {
        let d = new Date(t.eventdate._d.toString());
        let postedEvent = {
          'event_type':t.type_of_event,
          'event_datetime':d.toISOString(),
          'event_message':t.event,
          'e_id': $rootScope.id,
          'date_posted': date_posted,
          'event_status': $rootScope.user_type === 'admin' ? 'approved' : 'pending'
        };
        postEvents(postedEvent);
      }
    }

    t.selectedStatus = function(eventType){
      let etype;
      if (eventType === "Announcement/Events") {
        etype = eventType.replace("/", "%");
      }else{
        etype = eventType;
      }
      getAllEventsByType(etype);
    }

    t.post = function(){
      t.posting = true;
    }

    t.cancelPost = function(){
      t.posting = false;
    }

    function getEvents(status) {
      apiService.getEvents(status).then(function(response){
        t.events = response.data;
        console.log(response);
      }, function(error){
        console.log(error);
      });
    }

    function getAllEventsByType(eventType) {
      apiService.getAllEventsByType(eventType).then(function(response){
        t.events = response.data;
        if (t.events.length > 0) {
          t.empty_post = false;
        }
        else{
          t.response_message = "No "+eventType.event_type+" events";
          t.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }

    function postEvents(event){
      apiService.postEvents(event).then(function(response){
        if (response.data.status === 'approved') {
          t.posting = false;
          t.modalstate = true;
          t.event = "";
          swalert.successInfo(response.data.message, 'success', 1000);
        }else{
          t.posting = false;
          t.modalstate = true;
          t.event = "";          
          swalert.noTimeoutSuccessAlert(response.data.message);
        }
        console.log(t.modalstate);
      }, function(err){
        console.log(err);
      });
    }

    function getCoDepartments(deptId) {
      apiService.getCoDepartments(deptId).then(function(response){
        for(i = 0; i < response.data.length; i++){
          if (response.data[i].firstname.length > 4) {
            t.co_department[i].photo = response.data[i].photo;
            t.co_department[i].firstname = response.data[i].firstname.substr(0, 4)+"...";
          }
          else{
            t.co_department[i].photo = response.data[i].photo;
            t.co_department[i].firstname = response.data[i].firstname;         
          }

        }
      }, function(error){
        console.log(error);
      });
    }

    function formatDate(stringDate){
        var month = new Array();
        month[0] = "January"; month[1] = "February"; month[2] = "March"; 
        month[3] = "April";month[4] = "May"; month[5] = "June"; month[6] = "July";
        month[7] = "August"; month[8] = "September"; month[9] = "October";
        month[10] = "November"; month[11] = "December";

      var date = new Date(stringDate);
      return month[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();
    }


}]);

app.factory('socket', function ($rootScope) {
  var socket = io.connect('127.0.0.1:8000');
  return {
      on: function (eventName, callback) {
          socket.on(eventName, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  callback.apply(socket, args);
              });
          });
      },
      emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                  if (callback) {
                      callback.apply(socket, args);
                  }
              });
          })
      }
  };
});

app.directive('triggerUpload', function(){
    return {
      restrict: 'A',
      scope:{
        message: '@',
        event_date: '@',
        etype: '@',
        cmodal: '='
      },
      link: function(scope, elem, attrs) {
        elem.on('click', function(){
          if (scope.message!=="" && scope.event_date!=="" && scope.etype!=="") {
              $('#uploadingModal').modal({
                  backdrop: 'static',
                  keyboard: false
              });
          }
          scope.$watch('cmodal', function(newVal, oldVal){
            if (newVal === true) {
              $('#uploadingModal').modal('hide');
              scope.cmodal = false;
              console.log(scope.cmodal);
            }
          });
        });
      }
    }
 });

app.filter('checkPostPhoto', function(){
  return function(image){
    if (image) {
      return image;
    }
    else{
      return 'user_event.jpg';
    }
  }
});

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:updateAlmuniModalCtrl
 * @description
 * # updateAlmuniModalCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('updateAlmuniModalCtrl',['$scope', '$rootScope', '$cookies','$window', '$q', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $q, $location, $timeout, apiService, swalert) {


    var uc = this;
    uc.section_list =["A","B","C","D","E","F","G","H","I", "J", "K", "L", "M", "N", "O", "P"];

    $scope.$on('broadcastedAlumniDetailsFromMainCtrl', function(val, obj){
      uc.alumni = obj;
      $q.all([apiService.getCourses(obj.u_departmentId)]).then(function(response){
        uc.courses = response[0].data;
        giveInitialValueToCourse(obj.u_courseId);
        uc.section = obj.section;
        uc.gender = obj.gender;
        console.log(obj);
      });

    });

    function giveInitialValueToCourse(courseId){
      angular.forEach(uc.courses, function(val, i){
        courseId == val.course_id ? uc.selectedCourse = val : null;
      });
    }

}]);

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:userAccountsCtrl
 * @description
 * # userAccountsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('updateUsersCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, apiService, swalert) {

    var uc = this;

    $scope.$on('user_details_from_mainCtrl_to_updateUsersCtrl', function(v, obj){
      departments(obj.department_name);
      courses(obj.u_departmentId, obj.u_courseId);
      uc.id = obj.id;
      uc.student_id_number = obj.student_id_number;
      uc.email = obj.email;
      uc.user_status = obj.user_status;
      uc.alumni_name = obj.firstname+" "+obj.middlename+" "+obj.lastname;
    });

    uc.updateUserDetails = function(){
      let updates = {
        "u_departmentId": uc.selectedDepartment.department_id,
        "u_courseId": uc.selectedCourse.course_id,
        "user_status": uc.user_status,
        "id": uc.id
      };
      updateUser(updates);
    }

    function selectInitialDepartmentValue(department, dept){
      angular.forEach(department, function(val, i){
        if (val.department_name === dept) {
          uc.selectedDepartment = val;
        }
      });
    }

    function selectInitialCourseValue(course, courseId){
      angular.forEach(course, function(val, i){
        if (val.course_id === courseId) {
          uc.selectedCourse = val;
        }
      });
    }

    function departments(dept) {
      apiService.getDepartments().then(function(response){
        uc.departments = response.data;
        selectInitialDepartmentValue(response.data, dept);
      }, function(error){
        console.log(error);
      });
    }

    function courses(deptId, courseId) {
      apiService.getCourses(deptId).then(function(response){
        uc.courses = response.data;
        selectInitialCourseValue(response.data, courseId);
      }, function(error){
        console.log(error);
      });
    }

    function updateUser(updates){
      apiService.updateUser(updates).then(function(response){
        $scope.$emit('onreloadUsers');
        swalert.successAlert(response.data.message);
      }, function(err){
        console.log(err);
      });
    }
}]);

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
'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('viewedEventsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$timeout', '$stateParams', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $timeout, $stateParams, apiService, swalert) {

    var ve = this;
    ve.co_department = [];
    console.log($stateParams.source);   
    getUserProfile($stateParams.source);
    getEventsById($stateParams.source);

    for (var i = 0; i < 4; i++) {
      ve.co_department.push({"photo": "user.jpg"});
    }

    ve.thisTimeline = function(){
      $state.go("viewed", {'sp' : ve.fullname, source: ve.viewed_alumni[0].id});
    }

    ve.thisProfile = function(){
      $state.go("viewed.profile");
    }

    ve.thisProfileFellows = function(){
      $state.go("viewed.fellows");
    }

    function getUserProfile(source_id) {
      apiService.getUserProfile(source_id).then(function(response){
        ve.fullname = response.data[0].firstname+" "+response.data[0].middlename+" "+response.data[0].lastname;
        ve.viewed_alumni = response.data;
        getCoDepartments(response.data[0].u_departmentId);
        ve.p_pic = response.data[0].photo;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

    function getCoDepartments(deptId) {
      apiService.getCoDepartments(deptId).then(function(response){
        for(i = 0; i < response.data.length; i++){
          ve.co_department[i].photo = response.data[i].photo;
        }
      }, function(error){
        console.log(error);
      });
    }

    function getEventsById(id) {
      apiService.getEventsById(id).then(function(response){
        ve.events = response.data;
        if (ve.events.length === 0) {
          ve.response_message = "No posted events yet.";
          ve.empty_post = true;
        }
      }, function(error){
        console.log(error);
      });
    }

}]);

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:alumniCtrl
 * @description
 * # alumniCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('viewedProfileCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$timeout', '$stateParams', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $timeout, $stateParams, apiService, swalert) {

    var _vp = this;
    getUserProfile($stateParams.source);
    getAlumniEducations($rootScope.id);

    function getUserProfile(source_id) {
      apiService.getUserProfile(source_id).then(function(response){
        _vp.viewed_profile = response.data;
        getAlumniSkills(response.data[0].alumni_id);
        getAlumniWorkExp(response.data[0].alumni_id);
        getAlumniBusinesses(response.data[0].alumni_id);
      }, function(error){
        console.log(error);
      });
    }

    function getAlumniSkills(id) {
      apiService.getAlumniSkills(id).then(function(response){
        _vp.skills = response.data;
        checkIfSkillsIsEmpty(_vp.skills);
      }, function(error){
        console.log(error);
      });
    }

    function getAlumniWorkExp(aid){
      apiService.getAlumniWorkExp(aid).then(function(response){
        _vp.work_experiences = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniEducations(aid){
      apiService.getAlumniEducations(aid).then(function(response){
        _vp.educations = response.data;
        console.log(response.data);
      }, function(err){
        console.log(err);
      });
    }

    function getAlumniBusinesses(aid){
      apiService.getAlumniBusinesses(aid).then(function(response){
        _vp.businesses = response.data;
        console.log(response);
      }, function(err){
        console.log(err);
      });
    }

    function checkIfSkillsIsEmpty(response){
      if (response.length > 0) {
        _vp.emptySkills = false;
      }
      else{
        _vp.emptySkills = true;
      }
    }
}]);

'use strict';

/**
 * @ngdoc function
 * @name ALUMNI.controller:viewedProfileFellowsCtrl
 * @description
 * # viewedProfileFellowsCtrl
 * Controller of the ALUMNI
 */ 
var app = angular.module('myApp')
  app.controller('viewedProfileFellowsCtrl',['$scope', '$rootScope', '$cookies','$window', '$location', '$state', '$stateParams', '$timeout', 'apiService', 'swalert',
    function ($scope, $rootScope, $cookies, $window, $location, $state, $stateParams, $timeout, apiService, swalert) {

    var vf = this;
    
    getViewedfellowClassmates($stateParams.source);

    vf.viewFellow = function(fellow){
      let fname = fellow.firstname+fellow.middlename+fellow.lastname;
      $state.go("viewed", {'sp' : fname.toLowerCase(), source: fellow.id});
    }


    function getViewedfellowClassmates(id) {
      apiService.getViewedfellowClassmates(id).then(function(response){
        vf.co_department = response.data;
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }

}]);