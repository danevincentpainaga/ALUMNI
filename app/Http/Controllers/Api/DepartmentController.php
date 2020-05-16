<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\department;

class DepartmentController extends Controller
{
  public function departments(){
    return department::all();
  }

  public function getDepartments($did){
    if($did == "*"){
      return department::all();
    }
    else{
      return department::find($did)->first();
    }
  }
   
	public function addDepartment(Request $request){
		department::create($request->all());
		return response()->json(['message'=>'Successful!'], 200);
	}

	public function updateDepartment(Request $request){
		department::where('department_id', $request->input('department_id'))
					->update(['department_name'=> $request->input('department_name')]);
						return response()->json(['message'=>'Department Updated'], 200);
	}

    public function removeDepartment(Request $request){
      department::destroy($request->input('department_id'));
      return response()->json(['message'=>'Department removed'], 200);
   }

   public function validateDepartment($departmentName){
      $exist = department::where('department_name', $departmentName)->count(); 
      if($exist > 0){
         return response()->json(['message'=>'Department Name Already Exist!'], 403);
      }
      else{
         return response()->json(['message'=>'passed'], 200);
      }
   }

   public function getEmployedUnemployedDepartments(Request $request){
         return DB::select(
                        "SELECT 
                        (
                          SELECT count(a.alumni_id) FROM alumni_admins a
                          INNER JOIN users u ON u.u_alumniId = a.alumni_id 
                          INNER JOIN courses ct ON ct.course_id = u.u_courseId
                          WHERE ct.course_id = c.course_id AND job IS NOT NULL
                        ) as Employed, 
                        (
                          SELECT count(a.alumni_id) FROM alumni_admins a
                          INNER JOIN users u ON u.u_alumniId = a.alumni_id 
                          INNER JOIN courses ct ON ct.course_id = u.u_courseId
                          WHERE ct.course_id = c.course_id AND job IS NULL
                        ) as Unemployed, 
                        c.course_id, c.course_name FROM courses as c WHERE c_departmentId = ? AND c.course_name != 'INSTRUCTOR'", [$request[0]]
                );
   }

}
