package com.bhumisetu.document;

import com.bhumisetu.parcel.Parcel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents", indexes = {
    @Index(name = "idx_doc_parcel", columnList = "parcel_id"),
    @Index(name = "idx_doc_type", columnList = "documentType")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @Column(length = 50)
    private String documentId;

    @Column(length = 200, nullable = false)
    private String fileName;

    @Column(length = 100)
    private String contentType;

    @Column(length = 500)
    private String filePath;

    @Column(length = 30)
    private String documentType;

    @Column(length = 50)
    private String uploadedBy;

    @Column(length = 30)
    private String accessLevel;

    @Column(columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
