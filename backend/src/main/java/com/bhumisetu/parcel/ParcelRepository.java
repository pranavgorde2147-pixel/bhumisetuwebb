package com.bhumisetu.parcel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParcelRepository extends JpaRepository<Parcel, Long> {

    Optional<Parcel> findByParcelId(String parcelId);

    Optional<Parcel> findByUlpin(String ulpin);

    boolean existsByParcelId(String parcelId);

    @Query("SELECT p FROM Parcel p WHERE " +
           "(:village IS NULL OR p.village = :village) AND " +
           "(:tehsil IS NULL OR p.tehsil = :tehsil) AND " +
           "(:district IS NULL OR p.district = :district) AND " +
           "(:state IS NULL OR p.state = :state) AND " +
           "(:surveyNumber IS NULL OR p.surveyNumber = :surveyNumber) AND " +
           "(:khasraNumber IS NULL OR p.khasraNumber = :khasraNumber) AND " +
           "(:khataNumber IS NULL OR p.khataNumber = :khataNumber) AND " +
           "(:landUse IS NULL OR p.landUse = :landUse) AND " +
           "(:status IS NULL OR p.status = :status)")
    Page<Parcel> searchParcels(
        @Param("village") String village,
        @Param("tehsil") String tehsil,
        @Param("district") String district,
        @Param("state") String state,
        @Param("surveyNumber") String surveyNumber,
        @Param("khasraNumber") String khasraNumber,
        @Param("khataNumber") String khataNumber,
        @Param("landUse") String landUse,
        @Param("status") String status,
        Pageable pageable
    );

    @Query("SELECT p FROM Parcel p WHERE " +
           "(:query IS NULL OR LOWER(p.parcelId) LIKE LOWER(CONCAT('%',:query,'%')) " +
           "OR LOWER(p.ulpin) LIKE LOWER(CONCAT('%',:query,'%')) " +
           "OR LOWER(p.surveyNumber) LIKE LOWER(CONCAT('%',:query,'%')) " +
           "OR LOWER(p.khasraNumber) LIKE LOWER(CONCAT('%',:query,'%')))")
    Page<Parcel> searchByQuery(@Param("query") String query, Pageable pageable);
}
