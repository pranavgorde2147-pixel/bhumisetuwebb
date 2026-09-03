package com.bhumisetu.auth;

public interface AuthService {
    String sendOtp(String phoneNumber, String email);
    AuthResponse verifyOtp(String phoneNumber, String email, String otp, String sessionId);
}
