<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class alumni_admin extends Model
{
	public $timestamps = false;
    protected $primaryKey = 'alumni_id';
    protected $fillable = ['lastname', 'firstname', 'middlename', 'contact_no', 'gender', 'birthdate', 'address', 'permanent_address', 'job', 'photo'];


    public function users(){
    	return $this->hasMany(User::class, 'u_alumniId', 'alumni_id');
    }
}
