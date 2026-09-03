package com.bhumisetu.verification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerificationResponse {
    private String parcelId;
    private List<VerificationCheck> checks;
    private int totalChecks;
    private int passedChecks;
    private int failedChecks;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VerificationCheck {
        private String checkType;
        private String result;
        private String details;
        private String severity;
        private Double confidence;
        private LocalDateTime checkedAt;
    }

    public static VerificationResponse fromEntities(String parcelId, List<VerificationResult> results) {
        List<VerificationCheck> checks = results.stream()
            .map(r -> VerificationCheck.builder()
                .checkType(r.getCheckType())
                .result(r.getResult())
                .details(r.getDetails())
                .severity(r.getSeverity())
                .confidence(r.getConfidence())
                .checkedAt(r.getCheckedAt())
                .build())
            .toList();

        int passed = (int) checks.stream().filter(c -> "PASS".equals(c.getResult())).count();
        int failed = (int) checks.stream().filter(c -> "FAIL".equals(c.getResult())).count();

        return VerificationResponse.builder()
            .parcelId(parcelId)
            .checks(checks)
            .totalChecks(checks.size())
            .passedChecks(passed)
            .failedChecks(failed)
            .build();
    }
}
