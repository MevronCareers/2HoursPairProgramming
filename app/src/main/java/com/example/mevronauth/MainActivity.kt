package com.example.mevronauth

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.cardview.widget.CardView
import com.example.mevronauth.api.Service
import com.example.mevronauth.utils.Constants
import retrofit2.converter.gson.GsonConverterFactory

import retrofit2.Retrofit

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import java.util.concurrent.TimeUnit


class MainActivity : AppCompatActivity() {
    private lateinit var apiService: Service
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        apiService = Service()

        val cardLogin = findViewById<CardView>(R.id.cardLogin)
        cardLogin.setOnClickListener {
            startActivity(Intent(this, PhoneNumberActivity::class.java))
        }
    }


}