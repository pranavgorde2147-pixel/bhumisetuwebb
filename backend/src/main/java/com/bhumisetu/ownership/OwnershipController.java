package com.bhumisetu.ownership;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class OwnershipController {

    private final OwnershipService ownershipService;

    @GetMapping("/{parcelId}/ownership")
    public ApiResponse<List<OwnerResponse>> getOwnership(@PathVariable String parcelId) {
        return ApiResponse.success(ownershipService.getByParcelId(parcelId));
    }
}
