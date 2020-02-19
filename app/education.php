<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class education extends Model
{
    protected $primaryKey = 'education_id';
    public $timestamps =false;
    protected $fillable = ['education_id', 'degree', 'year_graduated', 'school', 'e_uid']; 
}
