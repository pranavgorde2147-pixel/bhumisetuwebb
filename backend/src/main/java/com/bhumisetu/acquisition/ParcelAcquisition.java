package com.bhumisetu.acquisition;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "parcel_acquisitions", indexes = {
    @Index(name = "idx_parc_acq_project", columnList = "project_id"),
    @Index(name = "idx_parc_acq_parcel", columnList = "parcelId")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelAcquisition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false)
    private AcquisitionProject project;

    @Column(nullable = false, length = 50)
    private String parcelId;

    @Column(precision = 12, scale = 2)
    private BigDecimal areaRequired;

    @Column(precision = 15, scale = 2)
    private BigDecimal compensationAmount;

    @Column(length = 30)
    private String acquisitionStatus;

    @Column(length = 200)
    private String ownerNotified;

    private LocalDateTime notificationSentAt;

    @Column(length = 30)
    private String representationStatus;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
