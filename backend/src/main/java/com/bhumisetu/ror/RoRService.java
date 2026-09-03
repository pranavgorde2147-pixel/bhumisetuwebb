package com.bhumisetu.ror;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoRService {

    private final RoRRepository roRRepository;
    private final ParcelRepository parcelRepository;

    public List<RoRResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<RecordOfRights> records = roRRepository.findByParcel(parcel);
        return records.stream().map(RoRResponse::fromEntity).toList();
    }
}
