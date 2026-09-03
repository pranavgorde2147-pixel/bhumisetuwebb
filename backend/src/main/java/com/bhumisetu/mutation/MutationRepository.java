package com.bhumisetu.mutation;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MutationRepository extends JpaRepository<MutationRecord, Long> {
    List<MutationRecord> findByParcel(Parcel parcel);
    List<MutationRecord> findByParcelId(Long parcelId);
    List<MutationRecord> findByStatus(String status);
}
