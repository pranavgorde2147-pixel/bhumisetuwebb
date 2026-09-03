package com.bhumisetu.servicerequest;

import com.bhumisetu.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/service-requests")
@RequiredArgsConstructor
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    @PostMapping
    public ApiResponse<ServiceRequestResponse> createRequest(@Valid @RequestBody ServiceRequestCreateRequest request) {
        ServiceRequestResponse response = serviceRequestService.create(request);
        return ApiResponse.created(response);
    }

    @GetMapping("/{id}")
    public ApiResponse<ServiceRequestResponse> getById(@PathVariable Long id) {
        return ApiResponse.success(serviceRequestService.getById(id));
    }

    @GetMapping("/by-request-id/{requestId}")
    public ApiResponse<ServiceRequestResponse> getByRequestId(@PathVariable String requestId) {
        return ApiResponse.success(serviceRequestService.getByRequestId(requestId));
    }

    @GetMapping("/parcel/{parcelId}")
    public ApiResponse<List<ServiceRequestResponse>> getByParcelId(@PathVariable String parcelId) {
        return ApiResponse.success(serviceRequestService.getByParcelId(parcelId));
    }

    @GetMapping("/open")
    public ApiResponse<List<ServiceRequestResponse>> getOpenRequests() {
        return ApiResponse.success(serviceRequestService.getOpenRequests());
    }
}
