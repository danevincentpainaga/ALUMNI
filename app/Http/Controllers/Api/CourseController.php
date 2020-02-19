<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\course;
use App\department;
use DB;

class CourseController extends Controller
{
    public function getCourses($deptId){
        return DB::table('courses')
            ->where('c_departmentId', $deptId)
            ->join('departments', 'courses.c_departmentId', '=', 'departments.department_id')
            ->select('courses.*', 'departments.*')
            ->get();
    }

    public function addCourse(Request $request){
      course::create($request->all());
      return response()->json(['message'=>'Successful!'], 200);
    }

    public function updateCourse(Request $request){
		course::where('course_id', $request->input('course_id'))
			->update(['course_name'=> $request->input('course_name')]);
				return response()->json(['message'=>'Course Updated'], 200);
    }

    public function removeCourse(Request $request){
      course::destroy($request->input('course_id'));
      return response()->json(['message'=>'Course removed'], 200);
    }

    public function validateCourse($courseName){
      $exist = course::where('course_name', $courseName)->count(); 
      if($exist > 0){
         return response()->json(['message'=>'Course Name Already Exist!'], 403);
      }
      else{
         return response()->json(['message'=>'passed'], 200);
      }
    }

}
