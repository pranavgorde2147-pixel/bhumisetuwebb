package com.bhumisetu.registration;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "registration_records", indexes = {
    @Index(name = "idx_reg_parcel", columnList = "parcel_id"),
    @Index(name = "idx_reg_doc_number", columnList = "documentNumber")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String documentNumber;

    @Column(length = 30)
    private String registrationType;

    private LocalDate registrationDate;

    @Column(length = 200)
    private String parties;

    @Column(precision = 15, scale = 2)
    private BigDecimal considerationAmount;

    @Column(length = 100)
    private String subRegistrarOffice;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "TEXT")
    private String details;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
