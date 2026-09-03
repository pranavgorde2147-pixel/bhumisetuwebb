package com.bhumisetu.acquisition;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcquisitionRepository extends JpaRepository<AcquisitionProject, Long> {
    Optional<AcquisitionProject> findByProjectId(String projectId);
    List<AcquisitionProject> findByStatus(String status);
}

@Repository
interface ParcelAcquisitionRepository extends JpaRepository<ParcelAcquisition, Long> {
    List<ParcelAcquisition> findByProject(AcquisitionProject project);
    List<ParcelAcquisition> findByParcelId(String parcelId);
}
