<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Mail;
use App\User;
use App\alumni_admin;
use DB;

class mailController extends Controller
{
	public $successStatus = 200;
	public $failedStatus = 401;

    public function sendVerificationLink(Request $request){

    	$user = User::where(['student_id_number'=> $request->input('student_id_number'), 'email'=> $request->input('email')])->get();
    	if (empty($user->email_verified_at)) {
			if(count($user) > 0)
			{
		    	Mail::send([], [], function($message) use ($request, $user){
		    		$message->to($request->input('email'), 'To UA Alumni member')
		    		->subject('UA Alumni Verification...')
		    		->setBody('<h3>UA Alumni Verification link.</h3> <br /> Click the link to verfiy account. http://localhost:8000/#!/verified?verification='.Crypt::encryptString($request->input('verification_at')).'&id='.Crypt::encryptString($user[0]->id));
		    		$message->from('danepainaga@gmail.com', 'Alumni');
		    	});
		    	return response()->json(['message'=>'Success!'], $this->successStatus); 
		    }
		    else
		    {
		    	return response()->json(['message'=>'Failed!'], $this->failedStatus); 
		    }
    	}
    	else{
    		return response()->json(['message'=>'Account Already Verified!'], $this->failedStatus); 
    	}
    }

    public function saveVerificationDate(Request $request){
    	$vcode = Crypt::decryptString($request->input('verification_date'));
    	$id = Crypt::decryptString($request->input('id'));
    	$password = bcrypt($request->input('password'));
		$user = User::find($id);
		$user->password = $password;
		$user->email_verified_at = $vcode;
		$user->save();
    
		$user_alumni = User::find($id)->alumni_admin;
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