<?php
namespace App\Http\Controllers\Api;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use App\alumni_admin; 
use Illuminate\Support\Facades\Auth; 
use Validator;
class AuthController extends Controller 
{

	 public $successStatus = 200;
	  
	 public function register(Request $request) {  
			 $validator = Validator::make($request->all(), [
			              'email' => 'required|email',
			              'password' => 'required',  
			              'c_password' => 'required|same:password', 
			    ]);   

			 if ($validator->fails()) {          
			       return response()->json(['error'=>$validator->errors()], 401);                        
			   }    
			 $input = $request->all();  
			 $input['password'] = bcrypt($input['password']);
			 $user = User::create($input); 
			 $success['token'] =  $user->createToken('AppName')->accessToken;
			 return response()->json(['success'=>$success], $this->successStatus);
	}
  
   
	public function login(){ 
		if(Auth::attempt(['email' => request('email'), 'password' => request('password'), 'user_status'=> 'Activated']))
		{
			if (empty(Auth::user()->email_verified_at)) {
				return response()->json(['error'=>'Account not Verified!'], 401); 
			}
			else
			{
				$user_alumni = User::find(Auth::user()->id)->alumni_admin;
				$user = Auth::user(); 
				$success['token'] =  $user->createToken('AppName')->accessToken;
				$new_name = $user_alumni->firstname.$user_alumni->lastname;
				$concatenated_name = str_replace(' ', '', $new_name);
				return response()->json([
					'success' => $success,
					'departmentId'=>$user->u_departmentId,
					'courseId'=>$user->u_courseId, 
					'section'=>$user->section,
					'id' => $user->id,
					'account_name'=>strtolower($concatenated_name),
					'name' => $user_alumni->firstname,
					'fullname' => $user_alumni->firstname.' '.$user_alumni->middlename.' '.$user_alumni->lastname,
					'user_type' => $user->user_type,
					'u_alumniId' => $user->u_alumniId,
					'year_graduated' => $user->year_graduated,
					'job' => $user_alumni->job,
				], $this->successStatus); 
			}
		}
		else
		{ 
			return response()->json(['error'=>'Unauthorised'], 401); 
		} 
	}
  
	public function getUser() {
		$user = Auth::user();
		return response()->json(['success' => $user], $this->successStatus); 
	}
}

