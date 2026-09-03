package com.bhumisetu.provenance;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProvenanceResponse {
    private Long id;
    private String parcelId;
    private String sourceSystem;
    private String department;
    private String recordId;
    private LocalDateTime lastUpdated;
    private LocalDateTime retrievedAt;
    private String version;

    public static ProvenanceResponse fromEntity(Provenance prov) {
        return ProvenanceResponse.builder()
            .id(prov.getId())
            .parcelId(prov.getParcelId())
            .sourceSystem(prov.getSourceSystem())
            .department(prov.getDepartment())
            .recordId(prov.getRecordId())
            .lastUpdated(prov.getLastUpdated())
            .retrievedAt(prov.getRetrievedAt())
            .version(prov.getVersion())
            .build();
    }
}
