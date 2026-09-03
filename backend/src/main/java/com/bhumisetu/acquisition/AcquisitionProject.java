package com.bhumisetu.acquisition;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "acquisition_projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcquisitionProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String projectId;

    @Column(nullable = false, length = 200)
    private String projectName;

    @Column(length = 30)
    private String projectType;

    @Column(length = 200)
    private String authority;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate notificationDate;

    private LocalDate hearingDate;

    @Column(length = 30)
    private String status;

    @Column(columnDefinition = "geometry(MultiPolygon, 4326)")
    private Object projectArea;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
