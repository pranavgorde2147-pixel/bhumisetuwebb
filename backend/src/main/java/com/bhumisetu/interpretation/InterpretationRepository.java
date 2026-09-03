package com.bhumisetu.interpretation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterpretationRepository extends JpaRepository<DocumentInterpretation, Long> {
    Optional<DocumentInterpretation> findByParcelIdAndTargetState(String parcelId, String targetState);
    List<DocumentInterpretation> findByParcelId(String parcelId);
}
