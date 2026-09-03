package com.bhumisetu.verification;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "verification_results", indexes = {
    @Index(name = "idx_verify_parcel", columnList = "parcelId")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerificationResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String parcelId;

    @Column(nullable = false, length = 50)
    private String checkType;

    @Column(nullable = false, length = 30)
    private String result;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(length = 100)
    private String checkedBy;

    @Column(length = 50)
    private String severity;

    private Double confidence;

    @CreationTimestamp
    private LocalDateTime checkedAt;
}
