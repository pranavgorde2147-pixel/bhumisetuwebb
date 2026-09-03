package com.bhumisetu.dispute;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "disputes", indexes = {
    @Index(name = "idx_dispute_parcel", columnList = "parcel_id"),
    @Index(name = "idx_dispute_type", columnList = "disputeType")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Dispute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String disputeNumber;

    @Column(length = 30)
    private String disputeType;

    @Column(length = 200)
    private String description;

    @Column(length = 200)
    private String parties;

    @Column(length = 50)
    private String courtOrForum;

    @Column(length = 50)
    private String caseNumber;

    private LocalDate filedDate;

    private LocalDate hearingDate;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String outcome;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
