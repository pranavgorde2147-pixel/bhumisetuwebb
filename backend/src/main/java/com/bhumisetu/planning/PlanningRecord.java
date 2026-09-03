package com.bhumisetu.planning;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "planning_records", indexes = {
    @Index(name = "idx_plan_parcel", columnList = "parcel_id"),
    @Index(name = "idx_plan_type", columnList = "planType")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlanningRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String planNumber;

    @Column(length = 30)
    private String planType;

    @Column(length = 200)
    private String planName;

    private LocalDate planDate;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String restrictions;

    @Column(columnDefinition = "TEXT")
    private String permittedUses;

    @Column(length = 100)
    private String zoningClassification;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
