package com.bhumisetu.dispute;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DisputeService {

    private final DisputeRepository disputeRepository;
    private final ParcelRepository parcelRepository;

    public List<DisputeResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<Dispute> disputes = disputeRepository.findByParcel(parcel);
        return disputes.stream().map(DisputeResponse::fromEntity).toList();
    }

    public DisputeResponse getById(Long id) {
        Dispute dispute = disputeRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Dispute not found: " + id));
        return DisputeResponse.fromEntity(dispute);
    }
}
