app.factory('apiService', ['$http', '$cookies', '$rootScope', function($http, $cookies, $rootScope){
  return{
    validateLogin: function(credData){
      return $http({
        method:'POST',
        url: baseUrl+'api/login',
        data: credData,
        headers: {
          Accept: "application/json",   
        }
      });
    },
    AuthenticatedUser: function(){
      var status = $cookies.get('auth');
        if(status){
          return true;
        }else{
          return false;
        }
    },

    getUsers: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getUsers',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateUser: function(userDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateUser',
        data: userDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    addNewAdmin: function(adminDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/addNewAdmin',
        data: adminDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateAlumniDetails: function(alumniDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateAlumniDetails',
        data: alumniDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updatePassword: function(credentials){
      return $http({
        method:'POST',
        url: baseUrl+'api/updatePassword',
        data: credentials,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    getUserProfile: function(id){
      return $http({
        method:'GET',
        url: baseUrl+'api/getUserProfile/'+id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getAlumniWorkExp: function(aid){
      return $http({
        method:'GET',
        url: baseUrl+'api/getAlumniWorkExp/'+aid,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getAlumniBusinesses: function(aid){
      return $http({
        method:'GET',
        url: baseUrl+'api/getAlumniBusinesses/'+aid,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getAlumniEducations: function(id){
      return $http({
        method:'GET',
        url: baseUrl+'api/getAlumniEducations/'+id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getAlumni: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/getAlumni',
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getCoDepartments: function(deptId){
      return $http({
        method:'GET',
        url: baseUrl+'api/getCoDepartments/'+deptId,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getViewedfellowClassmates: function(id){
      return $http({
        method:'GET',
        url: baseUrl+'api/getViewedfellowClassmates/'+id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getAlumniSkills: function(aid){
      return $http({
        method:'GET',
        url: baseUrl+'api/getAlumniSkills/'+aid,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    addAlumniSkills: function(alumniSkills){
      return $http({
        method:'POST',
        url: baseUrl+'api/addAlumniSkills',
        data: alumniSkills,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveWorkExperience: function(workExp){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveBusiness: function(business){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveEducation: function(education){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeAlumniSkills: function(alumniSkills){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeAlumniSkills',
        data: alumniSkills,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeBusiness: function(business){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeBusiness',
        data: business,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeWorkExperience: function(workExp){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeWorkExperience',
        data: workExp,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeEducations: function(education){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeEducations',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateAlumniEducation: function(education){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateAlumniEducation',
        data: education,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },    
    getSearchedAlumni: function(searchName){
      return $http({
        method:'GET',
        url: baseUrl+'api/getSearchedAlumni/'+searchName,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    addNewAlumni: function(alumniDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/addNewAlumni',
        data: alumniDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateNameAddress: function(newNameAdress){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateNameAddress',
        data: newNameAdress,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateProfile: function(profileInfo){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateProfile',
        data: profileInfo,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateJob: function(job){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateJob',
        data: job,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },


    getEmployedUnemployedDepartments: function(deptId){
      return $http({
        method:'POST',
        url: baseUrl+'api/getEmployedUnemployedDepartments',
        data: deptId,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    departments: function(){
      return $http({
        method:'GET',
        url: baseUrl+'api/departments',
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getDepartments: function(did = "*"){
      return $http({
        method:'GET',
        url: baseUrl+'api/getDepartments/'+did,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    addDepartment: function(departmentName){
      return $http({
        method:'POST',
        url: baseUrl+'api/addDepartment',
        data: departmentName,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateDepartment: function(updatedDepartment){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateDepartment',
        data: updatedDepartment,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeDepartment: function(departmentObj){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeDepartment',
        data: departmentObj,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    validateDepartment: function(deptname){
      return $http({
        method:'GET',
        url: baseUrl+'api/validateDepartment/'+deptname,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },

    getCourses: function(deptId){
      return $http({
        method:'GET',
        url: baseUrl+'api/getCourses/'+deptId,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getCourseById: function(courseId){
      return $http({
        method:'GET',
        url: baseUrl+'api/getCourseById/'+courseId,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    addCourse: function(courseName){
      return $http({
        method:'POST',
        url: baseUrl+'api/addCourse',
        data: courseName,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateCourse: function(updatedCourse){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateCourse',
        data: updatedCourse,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removeCourse: function(courseObj){
      return $http({
        method:'POST',
        url: baseUrl+'api/removeCourse',
        data: courseObj,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    validateCourse: function(coursename){
      return $http({
        method:'GET',
        url: baseUrl+'api/validateCourse/'+coursename,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },


    getEvents: function(status){
      return $http({
        method:'GET',
        url: baseUrl+'api/getEvents/'+status,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getEventsById: function(id){
      return $http({
        method:'GET',
        url: baseUrl+'api/getEventsById/'+id,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getEventsByStatus: function(user_event){
      return $http({
        method:'POST',
        url: baseUrl+'api/getEventsByStatus',
        data: user_event,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getSearchedEvents: function(searchedDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/getSearchedEvents',
        data: searchedDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getAllEventsByType: function(eventType){
      return $http({
        method:'GET',
        url: baseUrl+'api/getAllEventsByType/'+eventType,
        cache: false,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    postEvents: function(eventDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/postEvents',
        data: eventDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    updateEvent: function(eventDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/updateEvent',
        data: eventDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    approvedEvents: function(approved_event){
      return $http({
        method:'POST',
        url: baseUrl+'api/approvedEvents',
        data: approved_event,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    removePostedEvent: function(eventDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/removePostedEvent',
        data: eventDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },


    sendVerificationLink: function(verificationDate){
      return $http({
        method:'POST',
        url: baseUrl+'api/sendVerificationLink',
        data: verificationDate,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    saveVerificationDate: function(verificationDate){
      return $http({
        method:'POST',
        url: baseUrl+'api/saveVerificationDate',
        data: verificationDate,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });
    },
    getfellowClassmates: function(alumniDetails){
      return $http({
        method:'POST',
        url: baseUrl+'api/getfellowClassmates',
        data: alumniDetails,
        headers: {
          "Content-Type": "application/json",
          Authorization : 'Bearer '+ $rootScope.token
        }
      });  
    },



    uploadProfilePic: function(formData){
      return $http({
        method:'POST',
        url: baseUrl+'api/uploadProfilePic',
        data: formData,
        headers: {
          "Content-Type": undefined,
          Authorization : 'Bearer '+ $rootScope.token
        }
      });  
    }
  }  
}]);