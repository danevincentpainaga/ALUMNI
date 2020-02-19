<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class business_profile extends Model
{
    protected $primaryKey = 'business_id';
    public $timestamps =false;
    protected $fillable = ['business_id', 'business_name', 'b_alumniId']; 
}
