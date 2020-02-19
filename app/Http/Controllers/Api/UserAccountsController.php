<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\user;
use App\alumni_admin;
use App\department;
use App\course;
use DB;
use Auth;

class UserAccountsController extends Controller
{
    public $successStatus = 200;
    public $failedStatus = 404;

    public function getUsers(){
      $users = DB::table('users')->where('id', '!=', Auth::id())
      ->join('alumni_admins', 'users.u_alumniId', '=', 'alumni_admins.alumni_id')
      ->join('departments', 'users.u_departmentId', '=', 'departments.department_id')
      ->select('users.id', 'users.student_id_number', 'users.email', 'alumni_admins.lastname', 'alumni_admins.firstname', 'alumni_admins.middlename', 'users.year_graduated', 'users.user_status', 'users.u_departmentId', 'users.u_courseId', 'users.user_status', 'users.created_at', 'departments.department_name')
      ->orderBy('id')
      ->get();
      return $users;     	
    }

    public function getCourseById($courseId){
      return course::find($courseId);
    }

    public function updatePassword(Request $request){
      $user = User::find($request->input('id'));
      $passwordMatch = Hash::check($request->input('password'), $user->password);
      if($passwordMatch){
          $user->password = bcrypt($request->input('newpassword'));
          $user->save();
          return response()->json(['status'=> 'Success'], $this->successStatus);
      }
      else
      {
        return response()->json(['status'=> 'failed'], $this->failedStatus);
      }
    }    

    public function updateUser(Request $request){
      $user = User::find($request->input('id'));
      $user->u_departmentId = $request->input('u_departmentId');
      $user->u_courseId = $request->input('u_courseId');
      $user->user_status = $request->input('user_status');
      $user->save();
      return response()->json(['message'=> 'Updated'], $this->successStatus);
    }
}
