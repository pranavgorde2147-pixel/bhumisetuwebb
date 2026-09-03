package com.bhumisetu.mutation;

import com.bhumisetu.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class MutationController {

    private final MutationService mutationService;

    @GetMapping("/{parcelId}/mutations")
    public ApiResponse<List<MutationResponse>> getMutations(@PathVariable String parcelId) {
        return ApiResponse.success(mutationService.getByParcelId(parcelId));
    }

    @GetMapping("/mutations/{id}")
    public ApiResponse<MutationResponse> getMutationById(@PathVariable Long id) {
        return ApiResponse.success(mutationService.getById(id));
    }

    @PostMapping("/mutations")
    public ApiResponse<MutationResponse> createMutation(@Valid @RequestBody MutationRequest request) {
        MutationResponse response = mutationService.createMutation(request);
        return ApiResponse.created(response);
    }

    @GetMapping("/mutations/pending")
    public ApiResponse<List<MutationResponse>> getPendingMutations() {
        return ApiResponse.success(mutationService.getPendingMutations());
    }
}
