package com.example.mevronauth

import android.content.Intent
import android.graphics.Color
import android.graphics.LinearGradient
import android.graphics.Shader
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import androidx.cardview.widget.CardView

class PhoneNumberActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_phone_number)
        supportActionBar?.hide()
        val textView = findViewById<TextView>(R.id.textView3)
        val paint = textView.paint
        val width = paint.measureText(textView.text.toString())
        val textShader: Shader = LinearGradient(0f, 0f, width, textView.textSize, intArrayOf(
            Color.parseColor("#F59D19"),
            Color.parseColor("#EE1D1D"),
        ), null, Shader.TileMode.REPEAT)

        textView.paint.setShader(textShader)
        val cardNext = findViewById<CardView>(R.id.cardNext)
        cardNext.setOnClickListener {
            startActivity(Intent(this, OtpVerificationActivity::class.java))
        }
    }
}