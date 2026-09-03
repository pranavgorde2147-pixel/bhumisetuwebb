package com.bhumisetu.acquisition;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "acquisition_milestones")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcquisitionMilestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private AcquisitionProject project;

    @Column(length = 100)
    private String milestoneName;

    @Column(length = 30)
    private String status;

    private LocalDate targetDate;

    private LocalDate completedDate;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
