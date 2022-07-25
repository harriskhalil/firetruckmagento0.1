<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
//        $blog = Blog::latest()->paginate(5);
        $blog= Blog::all();
//        $blog= Blog::when($request->filter,function ($query,$filter){
//            return $query->where('name', 'LIKE', "%{$filter}%");
//        })->get();
//            ->latest()->paginate(5);
        return response([
            'status'=>'Success',
            'data'=>$blog,
        ],200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreBlogRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBlogRequest $request)
    {
        DB::beginTransaction();
        try {

            $blog= Blog::create($request->validated());
            DB::commit();
            return  response([
                'status'=>'success',
                'message'=>'Blog Created Successfully',
                'data'=>$blog
            ],200);

        }catch (\Exception $e){
            DB::rollBack();
            return response([
                'status'=>'Failed',
                'message'=>$e
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        return response([
                'status'=>'Success',
                'data'=>$blog
        ]);

    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBlogRequest  $request
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        try {
            $blog->update($request->validated());
            return response([
                'status'=>'Success',
                'message'=>'Blog Updated Successfully',
                'data'=>$blog
            ]);

        }catch (\Exception $e){
            return response([
                'status'=>'Failed',
                'message'=>$e
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {

        return response([
           'status'=>'Success',
           'message'=>'blog deleted successfully',
            'action'=>$blog->delete()
        ],200);
    }
}
