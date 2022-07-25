<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class AuthController extends Controller
{
    use HasApiTokens, HasFactory, Notifiable;
    public function register(Request $request)
    {


        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|required_with:confirm_password|same:confirm_password',
            'confirm_password'=>'min:6'
        ]);

        try {



            $user = User::create([
                'first_name' => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name' => $validatedData['last_name'],
                'users_type_id' => 1,
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => "User registered successfully",
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user'=>$user
            ]);
        }catch (\Exception $e){
            return response()->json([
                'status' => "Fail ",
                'message' => $e->getMessage(),
                'token_type' => [],
            ],500);
        }
    }
    public function login(Request $request)
    {
        $validated_data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);
        try {
            DB::beginTransaction();

            if (!Auth::attempt($validated_data)) {
                return response()->json([
                    'message' => 'Invalid Credentials'
                ], 401);
            }
            DB::commit();
            return  response()->json([
                'message' => 'User Logged in successfully',
                'access_token' => auth()->user()->createToken('API_Token')->plainTextToken,
                'user' => auth()->user(),
                'token_type' => 'Bearer',

            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return  response()->json([
                'status' => 'Failed',
                'message' => $e->getMessage()

            ], 400);
        }
    }
    public function logout(Request $request)
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'User successfully signed out']);
    }

}