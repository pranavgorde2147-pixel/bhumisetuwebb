package com.bhumisetu.interpretation;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class InterpretationController {

    private final InterpretationService interpretationService;

    @GetMapping("/{parcelId}/interpretation")
    public ApiResponse<InterpretationResponse> getInterpretation(
            @PathVariable String parcelId,
            @RequestParam String targetState) {
        return ApiResponse.success(interpretationService.getInterpretation(parcelId, targetState));
    }

    @PostMapping("/{parcelId}/interpretation")
    public ApiResponse<InterpretationResponse> generateInterpretation(
            @PathVariable String parcelId,
            @RequestParam String sourceState,
            @RequestParam String targetState) {
        InterpretationResponse response = interpretationService
            .generateInterpretation(parcelId, sourceState, targetState);
        return ApiResponse.created(response);
    }
}
