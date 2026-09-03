package com.bhumisetu.interpretation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SemanticFieldMappingRepository extends JpaRepository<SemanticFieldMapping, Long> {
    Optional<SemanticFieldMapping> findBySourceStateAndTargetStateAndSourceField(
        String sourceState, String targetState, String sourceField);
}
