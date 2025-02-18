<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisteredUserController extends Controller
{
    public function store(Request $request): Response
    {
        return response()->noContent();
    }
}
