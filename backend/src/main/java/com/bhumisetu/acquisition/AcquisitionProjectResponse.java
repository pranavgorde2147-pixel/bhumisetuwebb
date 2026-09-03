package com.bhumisetu.acquisition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AcquisitionProjectResponse {
    private Long id;
    private String projectId;
    private String projectName;
    private String projectType;
    private String authority;
    private String description;
    private LocalDate notificationDate;
    private LocalDate hearingDate;
    private String status;
    private LocalDateTime createdAt;

    public static AcquisitionProjectResponse fromEntity(AcquisitionProject project) {
        return AcquisitionProjectResponse.builder()
            .id(project.getId())
            .projectId(project.getProjectId())
            .projectName(project.getProjectName())
            .projectType(project.getProjectType())
            .authority(project.getAuthority())
            .description(project.getDescription())
            .notificationDate(project.getNotificationDate())
            .hearingDate(project.getHearingDate())
            .status(project.getStatus())
            .createdAt(project.getCreatedAt())
            .build();
    }
}
