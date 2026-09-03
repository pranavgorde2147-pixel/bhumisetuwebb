package com.bhumisetu.interpretation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterpretationResponse {
    private Long id;
    private String parcelId;
    private String sourceState;
    private String targetState;
    private String originalData;
    private String interpretedData;
    private String mappingApplied;
    private String status;

    public static InterpretationResponse fromEntity(DocumentInterpretation interp) {
        return InterpretationResponse.builder()
            .id(interp.getId())
            .parcelId(interp.getParcelId())
            .sourceState(interp.getSourceState())
            .targetState(interp.getTargetState())
            .originalData(interp.getOriginalData())
            .interpretedData(interp.getInterpretedData())
            .mappingApplied(interp.getMappingApplied())
            .status(interp.getStatus())
            .build();
    }
}
