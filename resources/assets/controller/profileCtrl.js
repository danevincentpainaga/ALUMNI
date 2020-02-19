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