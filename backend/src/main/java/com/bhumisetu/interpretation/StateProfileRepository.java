package com.bhumisetu.interpretation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateProfileRepository extends JpaRepository<StateProfile, Long> {
    Optional<StateProfile> findByStateName(String stateName);
    Optional<StateProfile> findByStateCode(String stateCode);
}
