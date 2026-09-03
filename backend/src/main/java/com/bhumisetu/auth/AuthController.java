package com.bhumisetu.auth;

import com.bhumisetu.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/otp/send")
    public ApiResponse<OtpSendResponse> sendOtp(@Valid @RequestBody OtpSendRequest request) {
        String sessionId = authService.sendOtp(request.getPhoneNumber(), request.getEmail());
        OtpSendResponse response = OtpSendResponse.builder()
            .sessionId(sessionId)
            .message("OTP sent successfully")
            .build();
        return ApiResponse.success(response);
    }

    @PostMapping("/otp/verify")
    public ApiResponse<AuthResponse> verifyOtp(@Valid @RequestBody OtpVerifyRequest request) {
        AuthResponse response = authService.verifyOtp(
            request.getPhoneNumber(),
            request.getEmail(),
            request.getOtp(),
            request.getSessionId()
        );
        return ApiResponse.success("OTP verified", response);
    }
}
