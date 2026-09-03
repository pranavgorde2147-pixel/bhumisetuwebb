package com.bhumisetu.servicerequest;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String requestId;

    @Column(length = 30)
    private String requestType;

    @Column(nullable = false, length = 50)
    private String parcelId;

    @Column(length = 200)
    private String citizenName;

    @Column(length = 50)
    private String citizenPhone;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String supportingDocuments;

    @Column(length = 30)
    private String status;

    @Column(length = 50)
    private String assignedTo;

    @Column(columnDefinition = "TEXT")
    private String resolutionNotes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
