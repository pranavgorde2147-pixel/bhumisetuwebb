package com.bhumisetu.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static String secret;
    private static long expirationMs;

    @Value("${app.jwt.secret}")
    public void setSecret(String secret) {
        JwtTokenProvider.secret = secret;
    }

    @Value("${app.jwt.expiration-ms}")
    public void setExpirationMs(long expirationMs) {
        JwtTokenProvider.expirationMs = expirationMs;
    }

    private static SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public static String generateToken(String userId, String phoneNumber) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
            .subject(userId)
            .claim("phoneNumber", phoneNumber)
            .issuedAt(now)
            .expiration(expiryDate)
            .signWith(getSigningKey())
            .compact();
    }

    public static Claims parseToken(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public static boolean validateToken(String token) {
        try {
            Claims claims = parseToken(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public static String getUserId(String token) {
        return parseToken(token).getSubject();
    }

    public static String getPhoneNumber(String token) {
        return parseToken(token).get("phoneNumber", String.class);
    }
}
