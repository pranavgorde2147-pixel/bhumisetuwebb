package com.bhumisetu.auth;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Profile({"development", "test"})
public class MockAuthService implements AuthService {

    private final Map<String, String> otpStore = new ConcurrentHashMap<>();
    private final Map<String, DemoAccount> demoAccounts = Map.of(
        "1111111111", new DemoAccount("CIT-10001", "Arjun Mehta", "arjun.mehta@example.com"),
        "2222222222", new DemoAccount("CIT-10002", "Kavya Nair", "kavya.nair@example.com"),
        "3333333333", new DemoAccount("CIT-10003", "Rohan Deshpande", "rohan.deshpande@example.com"),
        "4444444444", new DemoAccount("CIT-10004", "Meera Iyer", "meera.iyer@example.com"),
        "5555555555", new DemoAccount("CIT-10005", "Sameer Khan", "sameer.khan@example.com")
    );

    @Override
    public String sendOtp(String phoneNumber, String email) {
        if (!demoAccounts.containsKey(phoneNumber)) {
            throw new RuntimeException("Demo account not found");
        }
        String sessionId = UUID.randomUUID().toString();
        String otp = "123456";
        otpStore.put(sessionId, otp);
        System.out.println("[DEV] OTP for " + phoneNumber + ": " + otp);
        return sessionId;
    }

    @Override
    public AuthResponse verifyOtp(String phoneNumber, String email, String otp, String sessionId) {
        String storedOtp = otpStore.get(sessionId);
        if (storedOtp == null || !storedOtp.equals(otp)) {
            throw new RuntimeException("Invalid or expired OTP");
        }
        otpStore.remove(sessionId);

        DemoAccount account = demoAccounts.get(phoneNumber);
        String token = JwtTokenProvider.generateToken(account.id(), phoneNumber);

        return AuthResponse.builder()
            .token(token)
            .tokenType("Bearer")
            .expiresIn(86400000L)
            .userId(account.id())
            .phoneNumber(phoneNumber)
            .user(AuthResponse.UserSummary.builder()
                .id(account.id())
                .name(account.name())
                .phone(phoneNumber)
                .email(account.email())
                .build())
            .build();
    }

    private record DemoAccount(String id, String name, String email) {}
}
