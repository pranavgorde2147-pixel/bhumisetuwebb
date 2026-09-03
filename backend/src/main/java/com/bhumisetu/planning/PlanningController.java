package com.bhumisetu.planning;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class PlanningController {

    private final PlanningService planningService;

    @GetMapping("/{parcelId}/planning")
    public ApiResponse<List<PlanningResponse>> getPlanningRecords(@PathVariable String parcelId) {
        return ApiResponse.success(planningService.getByParcelId(parcelId));
    }

    @GetMapping("/planning/{id}")
    public ApiResponse<PlanningResponse> getPlanningById(@PathVariable Long id) {
        return ApiResponse.success(planningService.getById(id));
    }
}
