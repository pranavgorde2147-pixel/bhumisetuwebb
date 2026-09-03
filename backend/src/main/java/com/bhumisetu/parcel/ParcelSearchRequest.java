package com.bhumisetu.parcel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelSearchRequest {
    private String village;
    private String tehsil;
    private String district;
    private String state;
    private String surveyNumber;
    private String khasraNumber;
    private String khataNumber;
    private String ulpin;
    private String landUse;
    private String status;
    private Double minArea;
    private Double maxArea;
    private Double centerLat;
    private Double centerLng;
    private Double radiusKm;
    private int page;
    private int size;

    public int getPage() {
        return page > 0 ? page : 0;
    }

    public int getSize() {
        return size > 0 && size <= 100 ? size : 20;
    }
}
