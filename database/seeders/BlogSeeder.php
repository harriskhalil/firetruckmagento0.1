<?php

namespace Database\Seeders;

use Faker\Generator as Faker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        DB::table('blogs')->insert([
            'user_id'=>1,
            'title' => $faker->title,
            'excerpt' => $faker->slug('5'),
            'paragraph' => $faker->text('100'),
            'created_at'=>now(),
            'updated_at'=>now()
        ]);
    }
}
