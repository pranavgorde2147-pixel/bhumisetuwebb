package com.bhumisetu.ownership;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    List<Owner> findByParcel(Parcel parcel);
    List<Owner> findByParcelId(Long parcelId);
}
