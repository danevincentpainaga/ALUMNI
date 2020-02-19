/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/services/httpServices.js":
/*!***************************************************!*\
  !*** ./resources/assets/services/httpServices.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

app.factory('apiService', ['$http', '$cookies', '$rootScope', function ($http, $cookies, $rootScope) {
  return {
    validateLogin: function validateLogin(credData) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/login',
        data: credData,
        headers: {
          Accept: "application/json"
        }
      });
    },
    AuthenticatedUser: function AuthenticatedUser() {
      var status = $cookies.get('auth');

      if (status) {
        return true;
      } else {
        return false;
      }
    },
    getUsers: function getUsers() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getUsers',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateUser: function updateUser(userDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateUser',
        data: userDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    addNewAdmin: function addNewAdmin(adminDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/addNewAdmin',
        data: adminDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updatePassword: function updatePassword(credentials) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updatePassword',
        data: credentials,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getUserProfile: function getUserProfile(id) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getUserProfile/' + id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getAlumniWorkExp: function getAlumniWorkExp(aid) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getAlumniWorkExp/' + aid,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getAlumniBusinesses: function getAlumniBusinesses(aid) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getAlumniBusinesses/' + aid,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getAlumniEducations: function getAlumniEducations(id) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getAlumniEducations/' + id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getAlumni: function getAlumni() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getAlumni',
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getCoDepartments: function getCoDepartments(deptId) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getCoDepartments/' + deptId,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getViewedfellowClassmates: function getViewedfellowClassmates(id) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getViewedfellowClassmates/' + id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getAlumniSkills: function getAlumniSkills(aid) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getAlumniSkills/' + aid,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    addAlumniSkills: function addAlumniSkills(alumniSkills) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/addAlumniSkills',
        data: alumniSkills,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveWorkExperience: function saveWorkExperience(workExp) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveBusiness: function saveBusiness(business) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveEducation: function saveEducation(education) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeAlumniSkills: function removeAlumniSkills(alumniSkills) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeAlumniSkills',
        data: alumniSkills,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeBusiness: function removeBusiness(business) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeWorkExperience: function removeWorkExperience(workExp) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeEducations: function removeEducations(education) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeEducations',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateAlumniEducation: function updateAlumniEducation(education) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateAlumniEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getSearchedAlumni: function getSearchedAlumni(searchName) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getSearchedAlumni/' + searchName,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    addNewAlumni: function addNewAlumni(alumniDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/addNewAlumni',
        data: alumniDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateNameAddress: function updateNameAddress(newNameAdress) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateNameAddress',
        data: newNameAdress,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateProfile: function updateProfile(profileInfo) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateProfile',
        data: profileInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateJob: function updateJob(job) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateJob',
        data: job,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getEmployedUnemployedDepartments: function getEmployedUnemployedDepartments() {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getEmployedUnemployedDepartments/',
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getDepartments: function getDepartments() {
      var did = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getDepartments/' + did,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    addDepartment: function addDepartment(departmentName) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/addDepartment',
        data: departmentName,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateDepartment: function updateDepartment(updatedDepartment) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateDepartment',
        data: updatedDepartment,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeDepartment: function removeDepartment(departmentObj) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeDepartment',
        data: departmentObj,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    validateDepartment: function validateDepartment(deptname) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/validateDepartment/' + deptname,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getCourses: function getCourses(deptId) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getCourses/' + deptId,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getCourseById: function getCourseById(courseId) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getCourseById/' + courseId,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    addCourse: function addCourse(courseName) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/addCourse',
        data: courseName,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateCourse: function updateCourse(updatedCourse) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateCourse',
        data: updatedCourse,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removeCourse: function removeCourse(courseObj) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removeCourse',
        data: courseObj,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    validateCourse: function validateCourse(coursename) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/validateCourse/' + coursename,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getEvents: function getEvents(status) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getEvents/' + status,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getEventsById: function getEventsById(id) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getEventsById/' + id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getEventsByStatus: function getEventsByStatus(user_event) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/getEventsByStatus',
        data: user_event,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getSearchedEvents: function getSearchedEvents(searchedDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/getSearchedEvents',
        data: searchedDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getAllEventsByType: function getAllEventsByType(eventType) {
      return $http({
        method: 'GET',
        url: baseUrl + 'api/getAllEventsByType/' + eventType,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    postEvents: function postEvents(eventDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/postEvents',
        data: eventDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    updateEvent: function updateEvent(eventDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/updateEvent',
        data: eventDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    approvedEvents: function approvedEvents(approved_event) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/approvedEvents',
        data: approved_event,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    removePostedEvent: function removePostedEvent(eventDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/removePostedEvent',
        data: eventDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    sendVerificationLink: function sendVerificationLink(verificationDate) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/sendVerificationLink',
        data: verificationDate,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    saveVerificationDate: function saveVerificationDate(verificationDate) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/saveVerificationDate',
        data: verificationDate,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    getfellowClassmates: function getfellowClassmates(alumniDetails) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/getfellowClassmates',
        data: alumniDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    },
    uploadProfilePic: function uploadProfilePic(formData) {
      return $http({
        method: 'POST',
        url: baseUrl + 'api/uploadProfilePic',
        data: formData,
        headers: {
          "Content-Type": undefined,
          Authorization: 'Bearer ' + $rootScope.token
        }
      });
    }
  };
}]);

/***/ }),

/***/ 2:
/*!*********************************************************!*\
  !*** multi ./resources/assets/services/httpServices.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\ALUMNI\resources\assets\services\httpServices.js */"./resources/assets/services/httpServices.js");


/***/ })

/******/ });