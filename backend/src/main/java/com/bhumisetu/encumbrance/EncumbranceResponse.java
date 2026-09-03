package com.bhumisetu.encumbrance;

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
public class EncumbranceResponse {
    private Long id;
    private String encumbranceNumber;
    private String encumbranceType;
    private String party;
    private BigDecimal amount;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String details;

    public static EncumbranceResponse fromEntity(Encumbrance encumbrance) {
        return EncumbranceResponse.builder()
            .id(encumbrance.getId())
            .encumbranceNumber(encumbrance.getEncumbranceNumber())
            .encumbranceType(encumbrance.getEncumbranceType())
            .party(encumbrance.getParty())
            .amount(encumbrance.getAmount())
            .startDate(encumbrance.getStartDate())
            .endDate(encumbrance.getEndDate())
            .status(encumbrance.getStatus())
            .details(encumbrance.getDetails())
            .build();
    }
}
