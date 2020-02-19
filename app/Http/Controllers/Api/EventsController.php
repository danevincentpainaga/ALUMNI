<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Events\Event;
use App\alumni_event;
use DB;

class EventsController extends Controller
{
    public function getUserEventById($event_id){
        return DB::table('alumni_events')
                ->where('event_id', $event_id)
                ->join('users', 'users.id', '=', 'alumni_events.e_id')
                ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
                ->select('alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname',  'alumni_events.*')
                ->get();
    }

    public function postEvents(Request $request){
    	$posted_events = alumni_event::create($request->all());
    	$newlyAddedEvents =  $this->getUserEventById($posted_events->event_id);
    	if ($newlyAddedEvents[0]->event_status === 'approved') {
    		event(new Event($newlyAddedEvents));
    		return response()->json(['status'=>'approved', 'message'=>'Successful!'], 200);
    	}
    	else{
    		return response()->json(['status'=>'pending', 'message'=>'Your posted event will be seen by everybody after admin approved it. Thank you.'], 200);
    	}
    	
    }

    public function getEvents($status){
    	if ($status != 'undefined') {
		    $events = DB::table('alumni_events')
		    	->where('event_status', $status)
		    	->join('users', 'users.id', '=', 'alumni_events.e_id')
		        ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
		        ->select('users.photo', 'users.id', 'alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname', 'alumni_events.*')
		        ->orderBy('event_id', 'desc')
		        ->get();
    	}
    	else{
		    $events = DB::table('alumni_events')
		    	->join('users', 'users.id', '=', 'alumni_events.e_id')
		        ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
		        ->select('users.photo', 'users.id', 'alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname', 'alumni_events.*')
		        ->orderBy('event_id', 'desc')
		        ->get();    		
    	}

	    return $events;
    }

    public function getEventsById($id){
	    return DB::table('alumni_events')
	    	->where('e_id', $id)
	    	->join('users', 'users.id', '=', 'alumni_events.e_id')
	        ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
	        ->select('users.photo', 'users.id', 'alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname', 'alumni_events.*')
	        ->orderBy('event_id', 'desc')
	        ->get();
    }

    public function getEventsByStatus(Request $request){
    	if ($request['event_status'] == 'all') {
    		return $this->getEventsById($request['id']);
    	}
    	else{
		    return DB::table('alumni_events')
		    	->where('e_id', $request['id'])
		    	->where('event_status', $request['event_status'])
		    	->join('users', 'users.id', '=', 'alumni_events.e_id')
		        ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
				->select('users.photo', 'users.id', 'alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname', 'alumni_events.*')
				->orderBy('event_id', 'desc')
		        ->get();
	    }
    }

    public function getAllEventsByType($eventType){
    	$etype = null;
        if ($eventType === "Announcement%Events") {
            $etype = str_replace("%", "/", $eventType);
        }
        else{
        	$etype = $eventType;
        }
    	if ($etype == 'all') {
    		return $this->getEvents('undefined');
    	}
    	else{
		    return DB::table('alumni_events')
		    	->where('event_type', $etype)
		    	->join('users', 'users.id', '=', 'alumni_events.e_id')
		        ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
		        ->select('users.photo', 'users.id', 'alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname', 'alumni_events.*')
		        ->orderBy('event_id', 'desc')
		        ->get();
	    }
    }

	public function updateEvent(Request $request){
		alumni_event::where('event_id', $request->input('event_id'))
					->update(
								[
									'event_type'=> $request->input('event_type'),
									'event_datetime'=> $request->input('event_datetime'),
									'event_message'=> $request->input('event_message')
								]
							);

						return response()->json(['message'=>'Event Updated'], 200);
	}

	public function approvedEvents(Request $request){
		alumni_event::where('event_id', $request->input('event_id'))
					->update(
								[
									'event_status'=> $request->input('event_status')
								]
							);
					
						return response()->json(['message'=>'Event Updated'], 200);
	}

	public function removePostedEvent(Request $request){
        alumni_event::destroy($request->event_id);
        return response()->json(['message'=>'Event successfully removed'], 200);
	}

	public function getSearchedEvents(Request $request){
	    return DB::table('alumni_events')
	    	->where('event_type', $request->event_type)
	    	->join('users', 'users.id', '=', 'alumni_events.e_id')
	        ->join('alumni_admins', 'alumni_admins.alumni_id', '=', 'users.u_alumniId')
	        ->where('firstname', 'like', "%{$request->searched_name}%")
	        ->select('users.photo', 'users.id', 'alumni_admins.firstname', 'alumni_admins.middlename', 'alumni_admins.lastname', 'alumni_events.*')
	        ->get();		
	}
}
