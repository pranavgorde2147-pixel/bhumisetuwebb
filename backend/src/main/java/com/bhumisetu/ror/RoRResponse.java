package com.bhumisetu.ror;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoRResponse {
    private Long id;
    private String rorNumber;
    private String entryType;
    private String description;
    private String recordedBy;
    private String sourceDocument;
    private LocalDateTime entryDate;
    private LocalDateTime effectiveFrom;
    private LocalDateTime effectiveTo;
    private String status;
    private String rightsDetails;

    public static RoRResponse fromEntity(RecordOfRights ror) {
        return RoRResponse.builder()
            .id(ror.getId())
            .rorNumber(ror.getRorNumber())
            .entryType(ror.getEntryType())
            .description(ror.getDescription())
            .recordedBy(ror.getRecordedBy())
            .sourceDocument(ror.getSourceDocument())
            .entryDate(ror.getEntryDate())
            .effectiveFrom(ror.getEffectiveFrom())
            .effectiveTo(ror.getEffectiveTo())
            .status(ror.getStatus())
            .rightsDetails(ror.getRightsDetails())
            .build();
    }
}
