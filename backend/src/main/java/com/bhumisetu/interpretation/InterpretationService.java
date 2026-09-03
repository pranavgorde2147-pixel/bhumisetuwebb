package com.bhumisetu.interpretation;

import com.bhumisetu.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InterpretationService {

    private final InterpretationRepository interpretationRepository;
    private final SemanticFieldMappingRepository mappingRepository;
    private final StateProfileRepository stateProfileRepository;

    public InterpretationResponse getInterpretation(String parcelId, String targetState) {
        DocumentInterpretation interp = interpretationRepository
            .findByParcelIdAndTargetState(parcelId, targetState)
            .orElseThrow(() -> new ResourceNotFoundException(
                "No interpretation found for parcel " + parcelId + " targeting " + targetState));
        return InterpretationResponse.fromEntity(interp);
    }

    @Transactional
    public InterpretationResponse generateInterpretation(String parcelId, String sourceState, String targetState) {
        DocumentInterpretation interp = DocumentInterpretation.builder()
            .parcelId(parcelId)
            .sourceState(sourceState)
            .targetState(targetState)
            .originalData("{}")
            .interpretedData("{}")
            .mappingApplied("auto")
            .status("GENERATED")
            .build();

        DocumentInterpretation saved = interpretationRepository.save(interp);
        return InterpretationResponse.fromEntity(saved);
    }
}
