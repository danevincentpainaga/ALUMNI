<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class department extends Model
{
    protected $primaryKey = 'department_id';
    public $timestamps =false;
    protected $fillable = ['department_name'];
}
