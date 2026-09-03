package com.bhumisetu.encumbrance;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncumbranceRepository extends JpaRepository<Encumbrance, Long> {
    List<Encumbrance> findByParcel(Parcel parcel);
    List<Encumbrance> findByParcelId(Long parcelId);
}
