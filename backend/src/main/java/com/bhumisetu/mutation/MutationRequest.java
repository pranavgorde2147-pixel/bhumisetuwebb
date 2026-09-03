package com.bhumisetu.mutation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MutationRequest {
    private String parcelId;
    private String mutationType;
    private String fromParty;
    private String toParty;
    private BigDecimal areaAffected;
    private String reason;
    private String remarks;
}
