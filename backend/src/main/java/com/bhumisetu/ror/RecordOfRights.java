package com.bhumisetu.ror;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "record_of_rights", indexes = {
    @Index(name = "idx_ror_parcel", columnList = "parcel_id")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordOfRights {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id", nullable = false)
    private Parcel parcel;

    @Column(length = 50)
    private String rorNumber;

    @Column(length = 100)
    private String entryType;

    @Column(length = 200)
    private String description;

    @Column(length = 50)
    private String recordedBy;

    @Column(length = 50)
    private String sourceDocument;

    private LocalDateTime entryDate;

    private LocalDateTime effectiveFrom;

    private LocalDateTime effectiveTo;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String rightsDetails;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
