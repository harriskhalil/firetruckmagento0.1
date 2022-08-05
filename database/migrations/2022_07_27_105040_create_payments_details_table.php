<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_detail_id');
            $table->integer('amount');
            $table->string('provider');
            $table->string('status');
            $table->timestamps();
            $table->foreign('order_detail_id')
                ->references('id')
                ->on('orders_details')
                ->onDelete('cascade')
            ;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('payments_details');
    }
};
