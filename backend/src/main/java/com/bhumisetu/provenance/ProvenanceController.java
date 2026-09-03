package com.bhumisetu.provenance;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class ProvenanceController {

    private final ProvenanceService provenanceService;

    @GetMapping("/{parcelId}/provenance")
    public ApiResponse<List<ProvenanceResponse>> getProvenance(@PathVariable String parcelId) {
        return ApiResponse.success(provenanceService.getByParcelId(parcelId));
    }
}
