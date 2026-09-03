package com.bhumisetu.planning;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanningRepository extends JpaRepository<PlanningRecord, Long> {
    List<PlanningRecord> findByParcel(Parcel parcel);
    List<PlanningRecord> findByParcelId(Long parcelId);
}
