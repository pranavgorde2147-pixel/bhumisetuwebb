package com.bhumisetu.servicerequest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequestResponse {
    private Long id;
    private String requestId;
    private String requestType;
    private String parcelId;
    private String citizenName;
    private String citizenPhone;
    private String description;
    private String status;
    private String assignedTo;
    private String resolutionNotes;
    private LocalDateTime createdAt;

    public static ServiceRequestResponse fromEntity(ServiceRequest sr) {
        return ServiceRequestResponse.builder()
            .id(sr.getId())
            .requestId(sr.getRequestId())
            .requestType(sr.getRequestType())
            .parcelId(sr.getParcelId())
            .citizenName(sr.getCitizenName())
            .citizenPhone(sr.getCitizenPhone())
            .description(sr.getDescription())
            .status(sr.getStatus())
            .assignedTo(sr.getAssignedTo())
            .resolutionNotes(sr.getResolutionNotes())
            .createdAt(sr.getCreatedAt())
            .build();
    }
}
