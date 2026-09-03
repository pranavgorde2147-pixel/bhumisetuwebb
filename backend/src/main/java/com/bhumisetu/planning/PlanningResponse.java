package com.bhumisetu.planning;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanningResponse {
    private Long id;
    private String planNumber;
    private String planType;
    private String planName;
    private LocalDate planDate;
    private String status;
    private String restrictions;
    private String permittedUses;
    private String zoningClassification;

    public static PlanningResponse fromEntity(PlanningRecord record) {
        return PlanningResponse.builder()
            .id(record.getId())
            .planNumber(record.getPlanNumber())
            .planType(record.getPlanType())
            .planName(record.getPlanName())
            .planDate(record.getPlanDate())
            .status(record.getStatus())
            .restrictions(record.getRestrictions())
            .permittedUses(record.getPermittedUses())
            .zoningClassification(record.getZoningClassification())
            .build();
    }
}
