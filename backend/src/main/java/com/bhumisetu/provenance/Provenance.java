package com.bhumisetu.provenance;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "provenance", indexes = {
    @Index(name = "idx_prov_parcel", columnList = "parcelId"),
    @Index(name = "idx_prov_source", columnList = "sourceSystem")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Provenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String parcelId;

    @Column(nullable = false, length = 100)
    private String sourceSystem;

    @Column(length = 100)
    private String department;

    @Column(length = 50)
    private String recordId;

    private LocalDateTime lastUpdated;

    private LocalDateTime retrievedAt;

    @Column(length = 20)
    private String version;

    @Column(columnDefinition = "TEXT")
    private String dataHash;

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
