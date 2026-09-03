package com.bhumisetu.servicerequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequestCreateRequest {
    private String requestType;
    private String parcelId;
    private String citizenName;
    private String citizenPhone;
    private String description;
}
