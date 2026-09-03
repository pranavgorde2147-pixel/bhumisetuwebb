package com.bhumisetu.verification;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class VerificationController {

    private final VerificationService verificationService;

    @GetMapping("/{parcelId}/verification")
    public ApiResponse<VerificationResponse> getVerification(@PathVariable String parcelId) {
        return ApiResponse.success(verificationService.getVerificationResults(parcelId));
    }

    @PostMapping("/{parcelId}/verification")
    public ApiResponse<VerificationResponse> runVerification(@PathVariable String parcelId) {
        VerificationResponse response = verificationService.runVerificationChecks(parcelId);
        return ApiResponse.success("Verification checks completed", response);
    }
}
