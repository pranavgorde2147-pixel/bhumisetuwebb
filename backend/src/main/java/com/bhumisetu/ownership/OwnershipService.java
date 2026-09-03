package com.bhumisetu.ownership;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnershipService {

    private final OwnerRepository ownerRepository;
    private final ParcelRepository parcelRepository;

    public List<OwnerResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<Owner> owners = ownerRepository.findByParcel(parcel);
        return owners.stream().map(OwnerResponse::fromEntity).toList();
    }
}
