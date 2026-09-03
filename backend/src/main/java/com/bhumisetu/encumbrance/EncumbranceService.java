package com.bhumisetu.encumbrance;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EncumbranceService {

    private final EncumbranceRepository encumbranceRepository;
    private final ParcelRepository parcelRepository;

    public List<EncumbranceResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<Encumbrance> encumbrances = encumbranceRepository.findByParcel(parcel);
        return encumbrances.stream().map(EncumbranceResponse::fromEntity).toList();
    }

    public EncumbranceResponse getById(Long id) {
        Encumbrance encumbrance = encumbranceRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Encumbrance not found: " + id));
        return EncumbranceResponse.fromEntity(encumbrance);
    }
}
