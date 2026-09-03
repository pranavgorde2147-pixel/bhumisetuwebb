package com.bhumisetu.parcel;

import com.bhumisetu.common.ApiResponse;
import com.bhumisetu.common.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class ParcelController {

    private final ParcelService parcelService;

    @GetMapping
    public ApiResponse<PageResponse<ParcelResponse>> getParcels(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        ParcelSearchRequest request = ParcelSearchRequest.builder()
            .page(page)
            .size(size)
            .build();
        ParcelSearchResult result = parcelService.searchParcels(request);
        return ApiResponse.success(PageResponse.<ParcelResponse>builder()
            .items(result.getParcels())
            .totalElements(result.getTotalElements())
            .totalPages(result.getTotalPages())
            .page(result.getPage())
            .size(result.getSize())
            .build());
    }

    @GetMapping("/{id}")
    public ApiResponse<ParcelResponse> getParcelById(@PathVariable Long id) {
        return ApiResponse.success(parcelService.getById(id));
    }

    @GetMapping("/search")
    public ApiResponse<PageResponse<ParcelResponse>> searchParcels(
            @RequestParam(required = false) String village,
            @RequestParam(required = false) String tehsil,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) String surveyNumber,
            @RequestParam(required = false) String khasraNumber,
            @RequestParam(required = false) String khataNumber,
            @RequestParam(required = false) String landUse,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        ParcelSearchRequest request = ParcelSearchRequest.builder()
            .village(village)
            .tehsil(tehsil)
            .district(district)
            .state(state)
            .surveyNumber(surveyNumber)
            .khasraNumber(khasraNumber)
            .khataNumber(khataNumber)
            .landUse(landUse)
            .status(status)
            .page(page)
            .size(size)
            .build();

        ParcelSearchResult result = parcelService.searchParcels(request);
        return ApiResponse.success(PageResponse.<ParcelResponse>builder()
            .items(result.getParcels())
            .totalElements(result.getTotalElements())
            .totalPages(result.getTotalPages())
            .page(result.getPage())
            .size(result.getSize())
            .build());
    }

    @GetMapping("/by-parcel-id/{parcelId}")
    public ApiResponse<ParcelResponse> getByParcelId(@PathVariable String parcelId) {
        return ApiResponse.success(parcelService.getByParcelId(parcelId));
    }
}
