package com.bhumisetu.interpretation;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "document_interpretations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentInterpretation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String parcelId;

    @Column(nullable = false, length = 100)
    private String sourceState;

    @Column(nullable = false, length = 100)
    private String targetState;

    @Column(columnDefinition = "TEXT")
    private String originalData;

    @Column(columnDefinition = "TEXT")
    private String interpretedData;

    @Column(columnDefinition = "TEXT")
    private String mappingApplied;

    @Column(length = 30)
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
