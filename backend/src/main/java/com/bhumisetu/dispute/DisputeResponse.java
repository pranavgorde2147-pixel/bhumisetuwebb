package com.bhumisetu.dispute;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DisputeResponse {
    private Long id;
    private String disputeNumber;
    private String disputeType;
    private String description;
    private String parties;
    private String courtOrForum;
    private String caseNumber;
    private LocalDate filedDate;
    private LocalDate hearingDate;
    private String status;
    private String outcome;

    public static DisputeResponse fromEntity(Dispute dispute) {
        return DisputeResponse.builder()
            .id(dispute.getId())
            .disputeNumber(dispute.getDisputeNumber())
            .disputeType(dispute.getDisputeType())
            .description(dispute.getDescription())
            .parties(dispute.getParties())
            .courtOrForum(dispute.getCourtOrForum())
            .caseNumber(dispute.getCaseNumber())
            .filedDate(dispute.getFiledDate())
            .hearingDate(dispute.getHearingDate())
            .status(dispute.getStatus())
            .outcome(dispute.getOutcome())
            .build();
    }
}
