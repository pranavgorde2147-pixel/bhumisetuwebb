package com.bhumisetu.mutation;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "mutation_records", indexes = {
    @Index(name = "idx_mutation_parcel", columnList = "parcel_id"),
    @Index(name = "idx_mutation_number", columnList = "mutationNumber")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MutationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String mutationNumber;

    @Column(length = 30)
    private String mutationType;

    private LocalDate mutationDate;

    @Column(length = 200)
    private String fromParty;

    @Column(length = 200)
    private String toParty;

    @Column(precision = 15, scale = 2)
    private BigDecimal areaAffected;

    @Column(length = 30)
    private String status;

    @Column(length = 50)
    private String initiatedBy;

    @Column(columnDefinition = "TEXT")
    private String reason;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(length = 30)
    private String approvalStatus;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
