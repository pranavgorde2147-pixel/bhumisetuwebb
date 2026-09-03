package com.bhumisetu.mutation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MutationResponse {
    private Long id;
    private String mutationNumber;
    private String mutationType;
    private LocalDate mutationDate;
    private String fromParty;
    private String toParty;
    private BigDecimal areaAffected;
    private String status;
    private String initiatedBy;
    private String reason;
    private String remarks;
    private String approvalStatus;

    public static MutationResponse fromEntity(MutationRecord record) {
        return MutationResponse.builder()
            .id(record.getId())
            .mutationNumber(record.getMutationNumber())
            .mutationType(record.getMutationType())
            .mutationDate(record.getMutationDate())
            .fromParty(record.getFromParty())
            .toParty(record.getToParty())
            .areaAffected(record.getAreaAffected())
            .status(record.getStatus())
            .initiatedBy(record.getInitiatedBy())
            .reason(record.getReason())
            .remarks(record.getRemarks())
            .approvalStatus(record.getApprovalStatus())
            .build();
    }
}
