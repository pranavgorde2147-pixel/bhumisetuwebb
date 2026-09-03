package com.bhumisetu.registration;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @GetMapping("/{parcelId}/registrations")
    public ApiResponse<List<RegistrationResponse>> getRegistrations(@PathVariable String parcelId) {
        return ApiResponse.success(registrationService.getByParcelId(parcelId));
    }

    @GetMapping("/registrations/{id}")
    public ApiResponse<RegistrationResponse> getRegistrationById(@PathVariable Long id) {
        return ApiResponse.success(registrationService.getById(id));
    }

    @GetMapping("/registrations/by-document/{documentNumber}")
    public ApiResponse<List<RegistrationResponse>> getByDocumentNumber(@PathVariable String documentNumber) {
        return ApiResponse.success(registrationService.getByDocumentNumber(documentNumber));
    }
}
