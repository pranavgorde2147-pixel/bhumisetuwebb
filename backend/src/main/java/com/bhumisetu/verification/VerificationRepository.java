package com.bhumisetu.verification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerificationRepository extends JpaRepository<VerificationResult, Long> {
    List<VerificationResult> findByParcelId(String parcelId);
}
