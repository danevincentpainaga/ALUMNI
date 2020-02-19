<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\department;

class DepartmentController extends Controller
{
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

   public function getEmployedUnemployedDepartments(){
      $variable = ['CCS', 'CEA'];
      // $arr = [];
      foreach ($variable as $key => $value) {

        $arr = DB::table('alumni_admins')
                    // ->where('status', '<>', 1)
                    ->leftJoin('users', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                    ->leftJoin('departments', 'users.u_departmentId', '=', 'departments.department_id')
                    ->select('alumni_admins.*', 'users.*', 'departments.department_name')
                    // ->where('departments.department_id', '=', 'users.u_departmentId')
                    ->select(DB::raw('count(*) as '.$value.''))
                    ->whereNotNull('job')
                    ->where('departments.department_name', '=', $value)
                    ->get();
        $arrs[] = $arr;

      }

      return $arrs;
      // $arr = DB::table('alumni_admins')
      //             // ->where('status', '<>', 1)
      //             ->leftJoin('users', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
      //             ->leftJoin('departments', 'users.u_departmentId', '=', 'departments.department_id')
      //             ->select('alumni_admins.*', 'users.*', 'departments.department_name')
      //             // ->where('departments.department_id', '=', 'users.u_departmentId')
      //             ->select(DB::raw('count(*) as dept'))
      //             ->whereNotNull('job')
      //             ->where('users.u_departmentId', '=', 'CEA')
      //             ->get();
   }

}
