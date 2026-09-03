package com.bhumisetu.encumbrance;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class EncumbranceController {

    private final EncumbranceService encumbranceService;

    @GetMapping("/{parcelId}/encumbrances")
    public ApiResponse<List<EncumbranceResponse>> getEncumbrances(@PathVariable String parcelId) {
        return ApiResponse.success(encumbranceService.getByParcelId(parcelId));
    }

    @GetMapping("/encumbrances/{id}")
    public ApiResponse<EncumbranceResponse> getEncumbranceById(@PathVariable Long id) {
        return ApiResponse.success(encumbranceService.getById(id));
    }
}
