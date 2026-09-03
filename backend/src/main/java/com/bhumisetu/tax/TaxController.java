package com.bhumisetu.tax;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class TaxController {

    private final TaxService taxService;

    @GetMapping("/{parcelId}/taxes")
    public ApiResponse<List<TaxResponse>> getTaxes(@PathVariable String parcelId) {
        return ApiResponse.success(taxService.getByParcelId(parcelId));
    }

    @GetMapping("/taxes/{id}")
    public ApiResponse<TaxResponse> getTaxById(@PathVariable Long id) {
        return ApiResponse.success(taxService.getById(id));
    }

    @GetMapping("/taxes/year/{year}")
    public ApiResponse<List<TaxResponse>> getByYear(@PathVariable String year) {
        return ApiResponse.success(taxService.getByAssessmentYear(year));
    }
}
