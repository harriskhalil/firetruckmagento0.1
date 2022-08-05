<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
class AuthController extends Controller
{
    use HasApiTokens, HasFactory, Notifiable,CanResetPassword;
    public function register(Request $request)
    {


        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'users_type_id'=>'required',
            'password' => 'required|string|min:6|required_with:confirm_password|same:confirm_password',
            'confirm_password'=>'min:6'
        ]);

        try {
            $user = User::create([
                'first_name' => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name' => $validatedData['last_name'],
//                'users_type_id' => 1,
                'users_type_id' =>  $validatedData['users_type_id'],
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
//        auth()->user()->tokens()->delete();
        return response()->json(['message' => 'User successfully Logged out']);
    }


    public function social_login(){
        $guser = Socialite::driver('google')->stateless()->user();
        $user = User::whereEmail($guser->email)->first();

        if(!$user || !$user->id) {
//            $name = explode(" ", $guser->name);
//            $user = User::create([
//                'first_name' => $name[0],
//                'last_name' => $name[1] ?? '',
//                'users_type_id' => 1,
//                'email' => $guser->email,
//            ]);
            $user = new User();
            $user->email = $guser->email;
            $name = explode(" ", $guser->name);
            $user->first_name = $name[0];
            $user->last_name = $name[1];
            $user->users_type_id=1;
            $user->save();
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => "User logged in successfully",
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user'=>$user
        ]);
    }
    public function redirect() {
        return Socialite::driver('google')->redirect();
    }
    public function social_logout(){
        auth()->check() ? auth()->user()->logout() : '';
        return $this->respond();
    }
    public function sendResetLinkEmail(Request $request)
    {
        // Validate user input
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email', 'max:255' ],
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        // Attempt to send the password reset email to user.
        $response = Password::sendResetLink(
            $request->only(['email'])

        );


        // After attempting to send the link, we can examine the response to see
        // the message we need to show to the user and then send out a
        // proper response.

        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($request, $response)
            : $this->sendResetLinkFailedResponse($request, $response);
    }
    /**
     * Send the response for a successful password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse(Request $request, $response)
    {

        // On success, a string $response is returned with value of RESET_LINK_SENT
        // from the Password facade (the default is "passwords.sent")
        // Laravel trans() function translates this response to the text
        // designated in resources/lang/en/passwords.php

        return response()->json(['success' => ["message" => trans($response)] ], 200);
    }
    /**
     * Send the response for a failed password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response()->json(['error' => ["message" => trans($response)] ], 422);
    }
    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $req= $request->validate([
            'token' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255' ],
            'password' => 'required|string|min:6|required_with:confirm_password|same:confirm_password',
            'confirm_password'=>'min:6'
        ]);



        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = Password::reset(
            $req,
            function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );

        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($request, $response)
            : $this->sendResetFailedResponse($request, $response);
    }
    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Contracts\Auth\CanResetPassword  $user
     * @param  string  $password
     * @return void
     */
    protected function resetPassword($user, $password)
    {

        $db_user= User::whereEmail($user->email)->first();

        $db_user= $db_user->update([
            'password'=>Hash::make($password)
        ]);
        event(new PasswordReset($user));
        //By default, Laravel will attempt to automatically log in the user
        //$this->guard()->login($user);
    }
    /**
     * Get the response for a successful password reset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetResponse(Request $request, $response)
    {
        return response()->json(['success' => ["message" => trans($response)] ], 200);
    }
    /**
     * Get the response for a failed password reset.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendResetFailedResponse(Request $request, $response)
    {

        return response()->json(['error' => ["message" => trans($response)] ], 422);
    }
}
