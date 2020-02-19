<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class mailController extends Controller
{
    public function send(){
    	Mail::send([], [], function($message){
    		$message->to('danepainaga@gmail.com', 'To dane')->subject('UA Alumni Verification..!')
    		->setBody('<h3>UA Alumni Verification link. <br /> Click the link to verfiy account. http://localhost:8000/#!/home</h3>', 'text/html');
    		$message->from('danepainaga@gmail.com', 'Alumni');
    	});
    }
}
