<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlumniEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('alumni_events', function (Blueprint $table) {
        //     $table->bigIncrements('event_id');
        //     $table->string('event_type');
        //     $table->string('event_datetime');
        //     $table->string('event_message');
        //     $table->bigInteger('e_id')->unsigned();
        //     $table->foreign('e_id')->references('id')->on('users');
        //     $table->string('event_status');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
