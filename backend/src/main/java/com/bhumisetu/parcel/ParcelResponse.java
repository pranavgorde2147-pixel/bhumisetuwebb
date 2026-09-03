package com.bhumisetu.parcel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelResponse {
    private Long id;
    private String parcelId;
    private String ulpin;
    private String surveyNumber;
    private String khasraNumber;
    private String khataNumber;
    private String village;
    private String tehsil;
    private String district;
    private String state;
    private BigDecimal areaSqM;
    private String landUse;
    private String status;
    private BigDecimal riskScore;
    private Double centerLat;
    private Double centerLng;

    public static ParcelResponse fromEntity(Parcel parcel) {
        return ParcelResponse.builder()
            .id(parcel.getId())
            .parcelId(parcel.getParcelId())
            .ulpin(parcel.getUlpin())
            .surveyNumber(parcel.getSurveyNumber())
            .khasraNumber(parcel.getKhasraNumber())
            .khataNumber(parcel.getKhataNumber())
            .village(parcel.getVillage())
            .tehsil(parcel.getTehsil())
            .district(parcel.getDistrict())
            .state(parcel.getState())
            .areaSqM(parcel.getAreaSqM())
            .landUse(parcel.getLandUse())
            .status(parcel.getStatus())
            .riskScore(parcel.getRiskScore())
            .centerLat(parcel.getCenterLat())
            .centerLng(parcel.getCenterLng())
            .build();
    }
}
