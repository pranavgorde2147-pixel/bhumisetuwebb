package com.bhumisetu.parcel;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "parcel_geometries")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelGeometry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parcel_id", nullable = false)
    private Parcel parcel;

    @Column(columnDefinition = "geometry(Geometry, 4326)")
    private Object geometry;

    @Column(length = 30)
    private String geomType;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
