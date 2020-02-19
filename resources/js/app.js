  
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import '@uirouter/angularjs/lib/legacy/stateEvents.js';
require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

angular
.module('myApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ui.router.state.events',
  'ngSanitize',
  'ngTouch',
  '720kb.datepicker',
  'ui.calendar',
  'moment-picker',
  'chart.js'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('/', {
    url: '/',
    templateUrl: 'views/login.html',
  })
  .state('admin', {
    url: '/admin',
    views:{
      '':{
        templateUrl: 'views/administrator.html',
      },
      'dashboard-view@admin':{
        templateUrl: 'views/dashboard.html',
      }
    }
  })
  .state('admin.manage_alumni', {
    url: '/manage_alumni',
    views:{
      'dashboard-view@admin':{
        templateUrl: 'views/manage_alumni.html',
        controller: 'alumniCtrl',
        controllerAs: 'a'
      }
    }
  })
  .state('admin.manage_events', {
    url: '/manage_events',
    views:{
      'dashboard-view@admin':{
        templateUrl: 'views/manage_events.html',
      }
    }
  })
  .state('admin.user_accounts', {
    url: '/user_accounts',
    views:{
      'dashboard-view@admin':{
        templateUrl: 'views/user_accounts.html',
      }
    }
  })
  .state('admin.departments', {
    url: '/departments',
    views:{
      'dashboard-view@admin':{
        templateUrl: 'views/departments.html',
      }
    }
  })
  .state('admin.courses', {
    url: '/courses',
    views:{
      'dashboard-view@admin':{
        templateUrl: 'views/courses.html',
      }
    }
  })
  .state('account', {
    url: '/account/:alumni_name',
    views:{
      '':{
        templateUrl: 'views/home.html',
        controller: 'coverHeaderCtrl',
        controllerAs: 'ch'
      },
      'timeline-view@account':{
        templateUrl: 'views/timeline.html',
        controller: 'timelineEventsCtrl',
        controllerAs: 't'
      }
    }
  })
  .state('account.profile', {
    url: '/profile',
    views:{
      'timeline-view@account':{
       templateUrl: 'views/profile.html',
      }
    }
  })
  .state('account.fellows', {
    url: '/fellows',
    views:{
      'timeline-view@account':{
       templateUrl: 'views/fellows.html',
        controller: 'fellowsCtrl',
        controllerAs: 'f',
      }
    }
  })
  .state('account.myevents', {
    url: '/myevents',
    views:{
      'timeline-view@account':{
        templateUrl: 'views/myevents.html',
        controller: 'myeventsCtrl',
        controllerAs: 'm',
      }
    }
  })
  .state('security', {
    url: '/security?stud',
    views:{
      '':{
        templateUrl: 'views/security.html',
      }
    }
  })
  .state('verified', {
    url: '/verified?verification&id',
    views:{
      '':{
        templateUrl: 'views/verified.html',
      }
    }
  })
  .state('viewed', {
    url: '/viewed?sp&source',
    views:{
      '':{
        templateUrl: 'views/viewed.html',
        controller: 'viewedEventsCtrl',
        controllerAs: 've'
      },
      'viewedprofile-view@viewed':{
        templateUrl: 'views/viewed_events.html',
      }
    },
    resolve: { 
      hasparameters: function($stateParams, $location){
        if ($stateParams.sp === undefined && $stateParams.source === undefined) {
          $location.path('/');
        }
      }
    }
  })
  .state('viewed.profile', {
    url: '/profile',
    views:{
      'viewedprofile-view@viewed':{
        templateUrl: 'views/viewed_profile.html',
        controller: 'viewedProfileCtrl',
        controllerAs: '_vp'
      }
    }
  })
  .state('viewed.fellows', {
    url: '/fellows',
    views:{
      'viewedprofile-view@viewed':{
        templateUrl: 'views/viewed_profile_fellows.html',
        controller: 'viewedProfileFellowsCtrl',
        controllerAs: 'vf'
      }
    }
  })
  $urlRouterProvider.otherwise('/');
})
.config(['ChartJsProvider', function (ChartJsProvider) {
  // Configure all charts
  ChartJsProvider.setOptions({
    // chartColors: ['#FF5252', '#FF8A80'],
    // responsive: false
  });
  // Configure all line charts
  ChartJsProvider.setOptions('line', {
    // showLines: false
  });
}])
.run(['$transitions', '$rootScope', 'apiService', '$cookies', '$timeout', '$stateParams', function($transitions, $rootScope, apiService, $cookies, $timeout, $stateParams) {
 
 $transitions.onStart({}, function(transitions, err) {
    $rootScope.search_header = true;
    var auth = $cookies.getObject('auth');
    console.log(auth);
    var $state = transitions.router.stateService;  
    
    if (!apiService.AuthenticatedUser()) {
      if (transitions.to().name != 'verified') {
            $state.go('/');
      }
      $rootScope.loggedIn = false;
      
      console.log(transitions.to().name);
    }
    else
    {
      if (auth.user_type!=="user") {
        $rootScope.admin_granted = true;
      }
      $rootScope.id = auth.id;
      $rootScope.accountName = auth.account_name;
      $rootScope.fullname = auth.fullname;
      $rootScope.u_alumniId = auth.u_alumniId;
      $rootScope.departmentId = auth.departmentId;
      $rootScope.section = auth.section;
      $rootScope.courseId = auth.courseId;
      $rootScope.year_graduated = auth.year_graduated;
      $rootScope.job = auth.job;
      $rootScope.user_type = auth.user_type;
      if (transitions.to().name === '/') {
        $stateParams.alumni_name = auth.account_name;
        $state.go('account', {"alumni_name": $stateParams.alumni_name});
      }
      else if(
                transitions.to().name === 'admin' ||
                transitions.to().name === 'admin.manage_alumni' ||
                transitions.to().name === 'admin.manage_events' ||
                transitions.to().name === 'admin.departments' ||
                transitions.to().name === 'admin.user_accounts' ||
                transitions.to().name === 'admin.courses'
              )
      {
        if (auth.user_type === "user") {
          $state.go('account', {"alumni_name": $stateParams.alumni_name});
        }
        $rootScope.search_header = false;
      }
      $rootScope.loggedIn = true; 
      $rootScope.token = auth.success.token;
    }

    $state.defaultErrorHandler(function(error) {
      console.log(error);
    });
  });

  $transitions.onSuccess({}, function(transitions) {
    var auth = $cookies.getObject('auth');
    var $state = transitions.router.stateService;  
    if (!auth) {
      if (transitions.to().name != 'verified') {
        $state.go('/');
      }
      $rootScope.loggedIn = false; 
    }
    else{ 
      if(transitions.to().name == 'account'){
          $stateParams.alumni_name = auth.account_name;
          $state.go('account', {"alumni_name": $stateParams.alumni_name});
      }
      $rootScope.loggedIn = true;
    }
  });
}]);