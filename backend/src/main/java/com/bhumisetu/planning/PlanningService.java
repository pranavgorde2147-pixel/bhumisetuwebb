package com.bhumisetu.planning;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanningService {

    private final PlanningRepository planningRepository;
    private final ParcelRepository parcelRepository;

    public List<PlanningResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<PlanningRecord> records = planningRepository.findByParcel(parcel);
        return records.stream().map(PlanningResponse::fromEntity).toList();
    }

    public PlanningResponse getById(Long id) {
        PlanningRecord record = planningRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Planning record not found: " + id));
        return PlanningResponse.fromEntity(record);
    }
}
