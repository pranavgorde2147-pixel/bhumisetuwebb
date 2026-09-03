package com.bhumisetu.acquisition;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "acquisition_geometries")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcquisitionGeometry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private AcquisitionProject project;

    @Column(columnDefinition = "geometry(Geometry, 4326)")
    private Object geometry;

    @Column(length = 30)
    private String geomType;

    @Column(length = 50)
    private String layerName;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
