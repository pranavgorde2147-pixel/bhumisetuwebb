package com.bhumisetu.tax;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaxService {

    private final TaxRepository taxRepository;
    private final ParcelRepository parcelRepository;

    public List<TaxResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<PropertyTax> taxes = taxRepository.findByParcel(parcel);
        return taxes.stream().map(TaxResponse::fromEntity).toList();
    }

    public TaxResponse getById(Long id) {
        PropertyTax tax = taxRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Tax record not found: " + id));
        return TaxResponse.fromEntity(tax);
    }

    public List<TaxResponse> getByAssessmentYear(String year) {
        List<PropertyTax> taxes = taxRepository.findByAssessmentYear(year);
        return taxes.stream().map(TaxResponse::fromEntity).toList();
    }
}
