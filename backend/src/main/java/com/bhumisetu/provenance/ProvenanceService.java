package com.bhumisetu.provenance;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProvenanceService {

    private final ProvenanceRepository provenanceRepository;

    public List<ProvenanceResponse> getByParcelId(String parcelId) {
        List<Provenance> provenances = provenanceRepository.findByParcelId(parcelId);
        return provenances.stream().map(ProvenanceResponse::fromEntity).toList();
    }
}
