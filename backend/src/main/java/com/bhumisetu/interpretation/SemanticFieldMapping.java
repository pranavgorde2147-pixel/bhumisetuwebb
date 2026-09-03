package com.bhumisetu.interpretation;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "semantic_field_mappings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SemanticFieldMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String sourceField;

    @Column(nullable = false, length = 100)
    private String targetField;

    @Column(nullable = false, length = 100)
    private String sourceState;

    @Column(nullable = false, length = 100)
    private String targetState;

    @Column(columnDefinition = "TEXT")
    private String mappingLogic;

    @Column(length = 30)
    private String dataType;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
