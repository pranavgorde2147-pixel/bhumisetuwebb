package com.bhumisetu.acquisition;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelAcquisitionResponse {
    private Long id;
    private String parcelId;
    private BigDecimal areaRequired;
    private BigDecimal compensationAmount;
    private String acquisitionStatus;
    private String ownerNotified;
    private LocalDateTime notificationSentAt;
    private String representationStatus;
    private String notes;

    public static ParcelAcquisitionResponse fromEntity(ParcelAcquisition pa) {
        return ParcelAcquisitionResponse.builder()
            .id(pa.getId())
            .parcelId(pa.getParcelId())
            .areaRequired(pa.getAreaRequired())
            .compensationAmount(pa.getCompensationAmount())
            .acquisitionStatus(pa.getAcquisitionStatus())
            .ownerNotified(pa.getOwnerNotified())
            .notificationSentAt(pa.getNotificationSentAt())
            .representationStatus(pa.getRepresentationStatus())
            .notes(pa.getNotes())
            .build();
    }
}
