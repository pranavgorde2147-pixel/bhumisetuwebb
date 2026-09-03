package com.bhumisetu.ror;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoRRepository extends JpaRepository<RecordOfRights, Long> {
    List<RecordOfRights> findByParcel(Parcel parcel);
    List<RecordOfRights> findByParcelId(Long parcelId);
}
