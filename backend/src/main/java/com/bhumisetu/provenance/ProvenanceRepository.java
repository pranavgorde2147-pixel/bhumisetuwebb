package com.bhumisetu.provenance;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProvenanceRepository extends JpaRepository<Provenance, Long> {
    List<Provenance> findByParcelId(String parcelId);
}
