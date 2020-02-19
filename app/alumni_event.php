<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class alumni_event extends Model
{
    protected $primaryKey = 'event_id';
    public $timestamps =false;
    protected $fillable = ['event_type', 'event_datetime', 'event_message', 'e_id', 'date_posted',  'event_status'];
}
