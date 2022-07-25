<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users_type')->insert([
            'name' => 'customer',
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
        DB::table('users_type')->insert([
            'name' => 'admin',
            'created_at'=>now(),
            'updated_at'=>now(),
        ]);
    }
}
