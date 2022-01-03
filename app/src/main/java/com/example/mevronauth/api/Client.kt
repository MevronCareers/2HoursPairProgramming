package com.example.mevronauth.api

import com.example.mevronauth.utils.Constants
import okhttp3.MultipartBody
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.*

import retrofit2.http.Body;
import retrofit2.http.FieldMap;
import retrofit2.http.FormUrlEncoded;
import java.util.jar.Attributes

interface Client {
    @POST(Constants.REGISTER_NAME)
    fun registerName(@Body name : String, @Body email : String) : PhoneResponse

    @POST(Constants.REGISTER_PHONE)
    fun registerPhone(@Body phoneNumber : String)

    @POST(Constants.REGISTER_PHONE)
    fun validateOTP(@Body otp : String)

}