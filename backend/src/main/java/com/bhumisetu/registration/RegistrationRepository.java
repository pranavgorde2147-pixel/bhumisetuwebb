package com.bhumisetu.registration;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<RegistrationRecord, Long> {
    List<RegistrationRecord> findByParcel(Parcel parcel);
    List<RegistrationRecord> findByParcelId(Long parcelId);
    List<RegistrationRecord> findByDocumentNumber(String documentNumber);
}
