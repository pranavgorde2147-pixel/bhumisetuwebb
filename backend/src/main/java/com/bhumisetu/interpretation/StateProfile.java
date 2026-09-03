package com.bhumisetu.interpretation;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "state_profiles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String stateName;

    @Column(length = 5)
    private String stateCode;

    @Column(columnDefinition = "TEXT")
    private String fieldDefinitions;

    @Column(columnDefinition = "TEXT")
    private String terminologyMap;

    @Column(columnDefinition = "TEXT")
    private String unitConversions;

    @Column(length = 50)
    private String language;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
