package com.bhumisetu.parcel;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "parcels", indexes = {
    @Index(name = "idx_parcel_id", columnList = "parcelId"),
    @Index(name = "idx_ulpin", columnList = "ulpin"),
    @Index(name = "idx_village_tehsil", columnList = "village, tehsil"),
    @Index(name = "idx_district_state", columnList = "district, state")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Parcel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String parcelId;

    @Column(length = 50)
    private String ulpin;

    @Column(length = 50)
    private String surveyNumber;

    @Column(length = 50)
    private String khasraNumber;

    @Column(length = 50)
    private String khataNumber;

    @Column(length = 100)
    private String village;

    @Column(length = 100)
    private String tehsil;

    @Column(length = 100)
    private String district;

    @Column(length = 100)
    private String state;

    @Column(precision = 12, scale = 2)
    private BigDecimal areaSqM;

    @Column(length = 50)
    private String landUse;

    @Column(length = 30)
    @Builder.Default
    private String status = "ACTIVE";

    @Column(precision = 5, scale = 2)
    private BigDecimal riskScore;

    @Column(columnDefinition = "geometry(Polygon, 4326)")
    private Object geometry;

    private Double centerLat;

    private Double centerLng;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
