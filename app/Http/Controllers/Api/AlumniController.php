<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Image;
use File;
use App\User;
use App\course;
use App\alumni_admin;
use App\skill;
use App\work_experience;
use App\business_profile;
use App\education;
use DB;

class AlumniController extends Controller
{

    public function getAlumni(){
        // return alumni_admin::find(3)->users;
        return DB::table('alumni_admins')
                    ->join('users', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                    ->join('courses', 'users.u_courseId', '=', 'courses.course_id')
                    ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
                    ->select('alumni_admins.*', 'users.*', 'courses.*', 'departments.department_name')
                    ->get();
    }

    public function getCoDepartments($departmentId){
        return DB::table('users')
                ->where('u_departmentId', $departmentId)
                ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
                ->join('courses', 'users.u_courseId', '=', 'courses.course_id')
                ->select('alumni_admins.*', 'users.photo', 'courses.*', 'departments.*')
                ->limit(8)
                ->get();
    }

    public function getViewedfellowClassmates($id){
        $a = User::find($id);
        return DB::table('users')
                ->where('id', '!=', $id)
                ->where('u_departmentId', $a->u_departmentId)
                ->where('u_courseId', $a->u_courseId)
                ->where('year_graduated', $a->year_graduated)
                ->where('section', $a->section)
                ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
                ->join('courses', 'users.u_courseId', '=', 'courses.course_id')
                ->select('alumni_admins.*', 'users.*', 'courses.*', 'departments.*')
                ->get();       
    }

    public function getAlumniSkills($aid){
        return skill::where('alumniId', $aid)->get();
    }

    public function getAlumniBusinesses($aid){
        return business_profile::where('b_alumniId', $aid)->get();
    }

    public function getAlumniEducations($id){
        return education::where('e_uid', $id)->get();
    }

    public function addAlumniSkills(Request $request){
        return skill::create($request->all());
    }

    public function saveWorkExperience(Request $request){
        return work_experience::create($request->all());
    }

    public function saveBusiness(Request $request){
        return business_profile::create($request->all());
    }

    public function saveEducation(Request $request){
        return education::create($request->all());
    }

    public function removeAlumniSkills(Request $request){
        skill::destroy($request->skills_id);
        return response()->json(['message'=>'Skill deleted'], 200);
    }

    public function removeBusiness(Request $request){
        business_profile::destroy($request->business_id);
        return response()->json(['message'=>'Business successfully removed'], 200);
    }

    public function removeWorkExperience(Request $request){
        work_experience::destroy($request->work_experience_id);
        return response()->json(['message'=>'Work experience deleted'], 200);
    }

    public function removeEducations(Request $request){
        education::destroy($request->education_id);
        return response()->json(['message'=>'Deleted'], 200);
    }

    public function updateAlumniEducation(Request $request){

        $education = education::find($request->input('education_id'));
        $education->degree = $request->input('degree');
        $education->year_graduated = $request->input('year_graduated');
        $education->school = $request->input('school');
        $education->save();
        return response()->json(['message'=>'Successfully Updated'], 200);       
    
    }

    public function getUserProfile($id){
        return DB::table('users')
                ->where('id', $id)
                ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
                ->join('courses', 'users.u_courseId', '=', 'courses.course_id')
                ->select('alumni_admins.*', 'users.*', 'courses.*', 'departments.*')
                ->get();
    }

    public function getAlumniWorkExp($aid){
        return work_experience::where('w_aid', $aid)->get();
    }

    public function getSearchedAlumni($searched_name){
        return DB::table('alumni_admins')
                    ->where('firstname', 'like', "%{$searched_name}%")
                    ->join('users', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                    ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
                    ->join('courses', 'users.u_courseId', '=', 'courses.course_id')
                    ->select('alumni_admins.*', 'users.*', 'courses.*', 'departments.department_name')
                    ->get();
    }

    public function addNewAlumni(Request $request){
    	$alumni = [
    				"lastname" => $request->lastname,
    				"firstname" => $request->firstname,
    				"middlename" => $request->middlename,
    				"contact_no" => $request->contact_no,
                    "gender" => $request->gender,
    				"birthdate" => $request->birthdate,
    				"address" => $request->address,
    				"permanent_address" => $request->permanent_address,
		    	  ];
		$alumniDetails = alumni_admin::create($alumni);
    	$user = new User();
		$user->email = $request->userDetails[0]["email"];
    	$user->student_id_number = $request->userDetails[0]["student_id_number"];
    	$user->u_alumniId = $alumniDetails->alumni_id;
        $user->u_courseId = $request->userDetails[0]["u_courseId"];
        $user->u_departmentId = $request->userDetails[0]["u_departmentId"];
        $user->year_graduated = $request->userDetails[0]["year_graduated"];
        $user->section = $request->userDetails[0]["section"];
        $user->user_status = $request->userDetails[0]["user_status"];
        $user->user_type = $request->userDetails[0]["user_type"];
    	$user->save();
    	return response()->json(['message'=>'Successful'], 200);
    }

    public function updateNameAddress(Request $request){

        $alumni = alumni_admin::find($request->input('alumni_id'));
        $alumni->firstname = $request->input('firstname');
        $alumni->lastname = $request->input('lastname');
        $alumni->middlename = $request->input('middlename');
        $alumni->address = $request->input('address');
        $alumni->save();
        return response()->json(['message'=>'Successfully Updated'], 200);
        
    }

    public function updateProfile(Request $request){

        $alumni = alumni_admin::find($request->input('alumni_id'));
        $alumni->contact_no = $request->input('contact_no');
        $alumni->gender = $request->input('gender');
        $alumni->birthdate = $request->input('birthdate');
        $alumni->permanent_address = $request->input('permanent_address');
        $alumni->save();
        return response()->json(['message'=>'Successfully Updated'], 200);

    }

    public function updateJob(Request $request){

        $alumni = alumni_admin::find($request->input('alumni_id'));
        $alumni->company = $request->input('company');
        $alumni->job = $request->input('job');
        $alumni->save();
        return response()->json(['message'=>'Successfully Updated'], 200);       

    }

    public function getfellowClassmates(Request $request){
        return DB::table('users')
                ->where('id', '!=', Auth::id())
                ->where('u_departmentId', $request->u_departmentId)
                ->where('u_courseId', $request->u_courseId)
                ->where('year_graduated', $request->year_graduated)
                ->where('section', $request->section)
                ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
                ->join('courses', 'users.u_courseId', '=', 'courses.course_id')
                ->select('alumni_admins.*', 'users.*', 'courses.*', 'departments.*')
                ->get();       
    }

    public function uploadProfilePic(Request $request){
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = time().'.'.$file->getClientOriginalExtension();
            $destinationPath = public_path('uploads/'.$filename);
            Image::make($file)->resize(300, 300)->save($destinationPath);
            // $file->move($destinationPath, $filename);

            $user = User::findOrFail($request->input('id'));
            $oldfile = $user->photo;
            $user->photo = $filename;
            $user->save();

            $image_path = public_path('uploads/'. $oldfile);
            if (File::exists($image_path)) {
                File::delete($image_path);
            }

            return $filename;   
        }
    }

}
