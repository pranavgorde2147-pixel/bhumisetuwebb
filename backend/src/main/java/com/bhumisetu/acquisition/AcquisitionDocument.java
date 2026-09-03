package com.bhumisetu.acquisition;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "acquisition_documents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcquisitionDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private AcquisitionProject project;

    @Column(length = 50)
    private String documentId;

    @Column(length = 200)
    private String fileName;

    @Column(length = 100)
    private String documentType;

    @Column(length = 500)
    private String filePath;

    @CreationTimestamp
    private LocalDateTime uploadedAt;
}
