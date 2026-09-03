package com.bhumisetu.ownership;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "owners", indexes = {
    @Index(name = "idx_owner_parcel", columnList = "parcel_id"),
    @Index(name = "idx_owner_name", columnList = "name")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id", nullable = false)
    private Parcel parcel;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 30)
    private String ownerType;

    @Column(precision = 5, scale = 2)
    private BigDecimal sharePercentage;

    @Column(length = 50)
    private String recordSource;

    private LocalDate lastVerified;

    private LocalDate effectiveDate;

    @Column(length = 50)
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
