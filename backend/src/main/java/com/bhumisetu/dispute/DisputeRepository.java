package com.bhumisetu.dispute;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute, Long> {
    List<Dispute> findByParcel(Parcel parcel);
    List<Dispute> findByParcelId(Long parcelId);
}
