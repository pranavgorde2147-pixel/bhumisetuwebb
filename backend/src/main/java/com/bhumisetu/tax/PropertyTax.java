package com.bhumisetu.tax;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "property_taxes", indexes = {
    @Index(name = "idx_tax_parcel", columnList = "parcel_id"),
    @Index(name = "idx_tax_year", columnList = "assessmentYear")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PropertyTax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String taxId;

    @Column(length = 10)
    private String assessmentYear;

    @Column(precision = 15, scale = 2)
    private BigDecimal landValue;

    @Column(precision = 15, scale = 2)
    private BigDecimal improvementValue;

    @Column(precision = 15, scale = 2)
    private BigDecimal totalValue;

    @Column(precision = 10, scale = 2)
    private BigDecimal taxRate;

    @Column(precision = 15, scale = 2)
    private BigDecimal taxAmount;

    @Column(precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal taxPaid = BigDecimal.ZERO;

    private LocalDate dueDate;

    private LocalDate paidDate;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
