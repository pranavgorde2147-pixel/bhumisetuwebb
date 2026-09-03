package com.bhumisetu.tax;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaxRepository extends JpaRepository<PropertyTax, Long> {
    List<PropertyTax> findByParcel(Parcel parcel);
    List<PropertyTax> findByParcelId(Long parcelId);
    List<PropertyTax> findByAssessmentYear(String year);
}
