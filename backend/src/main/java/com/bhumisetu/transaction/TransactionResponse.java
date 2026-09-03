package com.bhumisetu.transaction;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponse {
    private Long id;
    private String transactionId;
    private String transactionType;
    private String parcelId;
    private String fromEntity;
    private String toEntity;
    private BigDecimal amount;
    private String status;
    private String initiatedBy;
    private String details;
    private String referenceId;
    private LocalDateTime createdAt;

    public static TransactionResponse fromEntity(Transaction txn) {
        return TransactionResponse.builder()
            .id(txn.getId())
            .transactionId(txn.getTransactionId())
            .transactionType(txn.getTransactionType())
            .parcelId(txn.getParcelId())
            .fromEntity(txn.getFromEntity())
            .toEntity(txn.getToEntity())
            .amount(txn.getAmount())
            .status(txn.getStatus())
            .initiatedBy(txn.getInitiatedBy())
            .details(txn.getDetails())
            .referenceId(txn.getReferenceId())
            .createdAt(txn.getCreatedAt())
            .build();
    }
}
