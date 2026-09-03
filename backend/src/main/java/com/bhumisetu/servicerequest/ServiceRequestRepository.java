package com.bhumisetu.servicerequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    Optional<ServiceRequest> findByRequestId(String requestId);
    List<ServiceRequest> findByParcelId(String parcelId);
    List<ServiceRequest> findByStatus(String status);
}
