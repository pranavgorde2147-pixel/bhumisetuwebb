package com.bhumisetu.encumbrance;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "encumbrances", indexes = {
    @Index(name = "idx_enc_parcel", columnList = "parcel_id"),
    @Index(name = "idx_enc_type", columnList = "encumbranceType")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Encumbrance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String encumbranceNumber;

    @Column(length = 30)
    private String encumbranceType;

    @Column(length = 200)
    private String party;

    @Column(precision = 15, scale = 2)
    private BigDecimal amount;

    private LocalDate startDate;

    private LocalDate endDate;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String details;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
