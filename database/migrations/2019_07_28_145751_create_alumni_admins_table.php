<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlumniAdminsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alumni_admins', function (Blueprint $table) {
            $table->bigIncrements('alumni_id');
            $table->string('lastname');
            $table->string('firstname');
            $table->string('middlename');
            $table->string('contact_no');
            $table->string('birthdate');
            $table->string('address');
            $table->string('permanent_address');
            $table->string('job');
            $table->string('photo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumni_admins');
    }
}
