package com.bhumisetu.registration;

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
public class RegistrationResponse {
    private Long id;
    private String documentNumber;
    private String registrationType;
    private LocalDate registrationDate;
    private String parties;
    private BigDecimal considerationAmount;
    private String subRegistrarOffice;
    private String status;
    private String details;

    public static RegistrationResponse fromEntity(RegistrationRecord record) {
        return RegistrationResponse.builder()
            .id(record.getId())
            .documentNumber(record.getDocumentNumber())
            .registrationType(record.getRegistrationType())
            .registrationDate(record.getRegistrationDate())
            .parties(record.getParties())
            .considerationAmount(record.getConsiderationAmount())
            .subRegistrarOffice(record.getSubRegistrarOffice())
            .status(record.getStatus())
            .details(record.getDetails())
            .build();
    }
}
