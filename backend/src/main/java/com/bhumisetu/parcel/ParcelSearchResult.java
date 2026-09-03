package com.bhumisetu.parcel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParcelSearchResult {
    private List<ParcelResponse> parcels;
    private long totalElements;
    private int totalPages;
    private int page;
    private int size;
}
