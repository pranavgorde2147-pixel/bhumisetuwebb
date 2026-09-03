package com.bhumisetu.transaction;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String transactionId;

    @Column(length = 30)
    private String transactionType;

    @Column(length = 50)
    private String parcelId;

    @Column(length = 200)
    private String fromEntity;

    @Column(length = 200)
    private String toEntity;

    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(length = 30)
    private String status;

    @Column(length = 50)
    private String initiatedBy;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(length = 50)
    private String referenceId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
