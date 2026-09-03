package com.bhumisetu.ownership;

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
public class OwnerResponse {
    private Long id;
    private String name;
    private String ownerType;
    private BigDecimal sharePercentage;
    private String recordSource;
    private LocalDate lastVerified;
    private LocalDate effectiveDate;
    private String status;

    public static OwnerResponse fromEntity(Owner owner) {
        return OwnerResponse.builder()
            .id(owner.getId())
            .name(owner.getName())
            .ownerType(owner.getOwnerType())
            .sharePercentage(owner.getSharePercentage())
            .recordSource(owner.getRecordSource())
            .lastVerified(owner.getLastVerified())
            .effectiveDate(owner.getEffectiveDate())
            .status(owner.getStatus())
            .build();
    }
}
