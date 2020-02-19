<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class work_experience extends Model
{
    protected $primaryKey = 'work_experience_id';
    public $timestamps =false;
    protected $fillable = ['w_company_name', 'w_position', 'w_aid']; 
}
