package com.example.mevronauth

import `in`.aabhasjindal.otptextview.OTPListener
import `in`.aabhasjindal.otptextview.OtpTextView
import android.content.Intent
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Shader
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.cardview.widget.CardView





class OtpVerificationActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_otp_verification)
        supportActionBar?.hide()
        val textView = findViewById<TextView>(R.id.textView3)
        val otpTextView: OtpTextView = findViewById(R.id.otp_view)
        val paint = textView.paint
        val width = paint.measureText(textView.text.toString())
        val textShader: Shader = LinearGradient(0f, 0f, width, textView.textSize, intArrayOf(
            Color.parseColor("#F59D19"),
            Color.parseColor("#EE1D1D"),
        ), null, Shader.TileMode.REPEAT)

        textView.paint.setShader(textShader)
        val cardNext = findViewById<CardView>(R.id.cardNext)
        cardNext.setOnClickListener {
            startActivity(Intent(this, NameEntryActivity::class.java))
        }
        otpTextView.otpListener = object : OTPListener {
            override fun onInteractionListener() {
                // fired when user types something in the Otpbox
            }

            override fun onOTPComplete(otp: String) {
                // fired when user has entered the OTP fully.
            }
        }
    }
}