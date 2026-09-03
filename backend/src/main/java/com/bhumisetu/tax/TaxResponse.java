package com.bhumisetu.tax;

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
public class TaxResponse {
    private Long id;
    private String taxId;
    private String assessmentYear;
    private BigDecimal landValue;
    private BigDecimal improvementValue;
    private BigDecimal totalValue;
    private BigDecimal taxRate;
    private BigDecimal taxAmount;
    private BigDecimal taxPaid;
    private LocalDate dueDate;
    private LocalDate paidDate;
    private String status;
    private String remarks;

    public static TaxResponse fromEntity(PropertyTax tax) {
        return TaxResponse.builder()
            .id(tax.getId())
            .taxId(tax.getTaxId())
            .assessmentYear(tax.getAssessmentYear())
            .landValue(tax.getLandValue())
            .improvementValue(tax.getImprovementValue())
            .totalValue(tax.getTotalValue())
            .taxRate(tax.getTaxRate())
            .taxAmount(tax.getTaxAmount())
            .taxPaid(tax.getTaxPaid())
            .dueDate(tax.getDueDate())
            .paidDate(tax.getPaidDate())
            .status(tax.getStatus())
            .remarks(tax.getRemarks())
            .build();
    }
}
