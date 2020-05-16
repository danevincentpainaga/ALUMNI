<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('login', 'API\AuthController@login');
Route::post('register', 'API\AuthController@register');
Route::group(['middleware'=>'auth:api'], function(){
	// UsersAccounts Api's
	Route::get('getUsers', 'API\UserAccountsController@getUsers');
	Route::post('updateUser', 'API\UserAccountsController@updateUser');
	Route::post('updatePassword', 'API\UserAccountsController@updatePassword');
	Route::get('getCourseById/{courseId}', 'API\UserAccountsController@getCourseById');
	Route::post('addNewAdmin', 'API\AlumniController@addNewAlumni');
	Route::post('updateAlumniDetails', 'API\AlumniController@updateAlumniDetails');
	

	// Alumni_admins Api's
	Route::get('getAlumni', 'API\AlumniController@getAlumni');
	Route::get('getCoDepartments/{deptId}', 'API\AlumniController@getCoDepartments');
	Route::get('getViewedfellowClassmates/{id}', 'API\AlumniController@getViewedfellowClassmates');
	Route::get('getAlumniSkills/{aid}', 'API\AlumniController@getAlumniSkills');
	Route::get('getAlumniWorkExp/{aid}', 'API\AlumniController@getAlumniWorkExp');
	Route::get('getAlumniBusinesses/{aid}', 'API\AlumniController@getAlumniBusinesses');
	Route::get('getAlumniEducations/{id}', 'API\AlumniController@getAlumniEducations');
	Route::get('getSearchedAlumni/{searchName}', 'API\AlumniController@getSearchedAlumni');
	Route::get('getUserProfile/{id}', 'API\AlumniController@getUserProfile');
	Route::post('addNewAlumni', 'API\AlumniController@addNewAlumni');
	Route::post('updateNameAddress', 'API\AlumniController@updateNameAddress');
	Route::post('updateProfile', 'API\AlumniController@updateProfile');
	Route::post('updateJob', 'API\AlumniController@updateJob');
	Route::post('addAlumniSkills', 'API\AlumniController@addAlumniSkills');
	Route::post('saveWorkExperience', 'API\AlumniController@saveWorkExperience');
	Route::post('saveBusiness', 'API\AlumniController@saveBusiness');
	Route::post('saveEducation', 'API\AlumniController@saveEducation');
	Route::post('removeAlumniSkills', 'API\AlumniController@removeAlumniSkills');
	Route::post('removeBusiness', 'API\AlumniController@removeBusiness');
	Route::post('removeWorkExperience', 'API\AlumniController@removeWorkExperience');
	Route::post('removeEducations', 'API\AlumniController@removeEducations');
	Route::post('updateAlumniEducation', 'API\AlumniController@updateAlumniEducation');
	Route::post('uploadProfilePic', 'API\AlumniController@uploadProfilePic');
	

	// Courses API's
	Route::get('getCourses/{deptId}', 'API\CourseController@getCourses');
	Route::post('addCourse', 'API\CourseController@addCourse');
	Route::post('updateCourse', 'API\CourseController@updateCourse');
	Route::post('removeCourse', 'API\CourseController@removeCourse');
	Route::get('validateCourse/{courseName}', 'API\CourseController@validateCourse');

	//Departments Api's
	Route::get('departments', 'API\DepartmentController@departments');
	Route::post('getEmployedUnemployedDepartments', 'API\DepartmentController@getEmployedUnemployedDepartments');
	Route::get('getDepartments/{deptId}', 'API\DepartmentController@getDepartments');
	Route::post('addDepartment', 'API\DepartmentController@addDepartment');
	Route::post('updateDepartment', 'API\DepartmentController@updateDepartment');
	Route::post('removeDepartment', 'API\DepartmentController@removeDepartment');
	Route::get('validateDepartment/{departmentName}', 'API\departmentController@validateDepartment');


	// Events Api's
	Route::get('getEvents/{status}', 'API\EventsController@getEvents');
	Route::get('getEventsById/{id}', 'API\EventsController@getEventsById');
	Route::get('getAllEventsByType/{eventType}', 'API\EventsController@getAllEventsByType');
	Route::post('getEventsByStatus', 'API\EventsController@getEventsByStatus');
	Route::post('getSearchedEvents', 'API\EventsController@getSearchedEvents');
	Route::post('postEvents', 'API\EventsController@postEvents');
	Route::post('updateEvent', 'API\EventsController@updateEvent');
	Route::post('approvedEvents', 'API\EventsController@approvedEvents');
	Route::post('removePostedEvent', 'API\EventsController@removePostedEvent');

	// Fellows Controller
	Route::post('getfellowClassmates', 'API\AlumniController@getfellowClassmates');
	
});

Route::post('sendVerificationLink', 'API\mailController@sendVerificationLink');
Route::post('saveVerificationDate', 'API\mailController@saveVerificationDate');