package com.bhumisetu.mutation;

import com.bhumisetu.common.BadRequestException;
import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MutationService {

    private final MutationRepository mutationRepository;
    private final ParcelRepository parcelRepository;

    public List<MutationResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<MutationRecord> records = mutationRepository.findByParcel(parcel);
        return records.stream().map(MutationResponse::fromEntity).toList();
    }

    public MutationResponse getById(Long id) {
        MutationRecord record = mutationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Mutation not found: " + id));
        return MutationResponse.fromEntity(record);
    }

    @Transactional
    public MutationResponse createMutation(MutationRequest request) {
        Parcel parcel = parcelRepository.findByParcelId(request.getParcelId())
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + request.getParcelId()));

        MutationRecord record = MutationRecord.builder()
            .parcel(parcel)
            .mutationNumber("MUT-" + System.currentTimeMillis() % 100000)
            .mutationType(request.getMutationType())
            .mutationDate(LocalDate.now())
            .fromParty(request.getFromParty())
            .toParty(request.getToParty())
            .areaAffected(request.getAreaAffected())
            .status("PENDING")
            .initiatedBy("CITIZEN")
            .reason(request.getReason())
            .remarks(request.getRemarks())
            .approvalStatus("PENDING")
            .build();

        MutationRecord saved = mutationRepository.save(record);
        return MutationResponse.fromEntity(saved);
    }

    public List<MutationResponse> getPendingMutations() {
        List<MutationRecord> records = mutationRepository.findByStatus("PENDING");
        return records.stream().map(MutationResponse::fromEntity).toList();
    }
}
