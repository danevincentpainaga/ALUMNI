<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class course extends Model
{
    protected $primaryKey = 'course_id';
    public $timestamps =false;
    protected $fillable = ['course_id', 'course_name', 'c_departmentId']; 
}
