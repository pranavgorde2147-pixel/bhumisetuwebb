package com.bhumisetu.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Collections;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPrincipal {
    private String userId;
    private String phoneNumber;
    private String email;
    private Collection<String> roles;

    public static UserPrincipal create(String userId, String phoneNumber) {
        return UserPrincipal.builder()
            .userId(userId)
            .phoneNumber(phoneNumber)
            .roles(Collections.singletonList("CITIZEN"))
            .build();
    }
}
