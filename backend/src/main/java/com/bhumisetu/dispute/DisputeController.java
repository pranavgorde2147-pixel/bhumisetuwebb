package com.bhumisetu.dispute;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class DisputeController {

    private final DisputeService disputeService;

    @GetMapping("/{parcelId}/disputes")
    public ApiResponse<List<DisputeResponse>> getDisputes(@PathVariable String parcelId) {
        return ApiResponse.success(disputeService.getByParcelId(parcelId));
    }

    @GetMapping("/disputes/{id}")
    public ApiResponse<DisputeResponse> getDisputeById(@PathVariable Long id) {
        return ApiResponse.success(disputeService.getById(id));
    }
}
