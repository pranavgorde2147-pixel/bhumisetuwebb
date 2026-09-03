package com.bhumisetu.acquisition;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/acquisitions")
@RequiredArgsConstructor
public class AcquisitionController {

    private final AcquisitionService acquisitionService;

    @GetMapping("/projects/{projectId}")
    public ApiResponse<AcquisitionProjectResponse> getProject(@PathVariable String projectId) {
        return ApiResponse.success(acquisitionService.getProject(projectId));
    }

    @GetMapping("/projects/active")
    public ApiResponse<List<AcquisitionProjectResponse>> getActiveProjects() {
        return ApiResponse.success(acquisitionService.getActiveProjects());
    }

    @GetMapping("/projects/{projectId}/parcels")
    public ApiResponse<List<ParcelAcquisitionResponse>> getParcelAcquisitions(@PathVariable String projectId) {
        return ApiResponse.success(acquisitionService.getParcelAcquisitions(projectId));
    }

    @GetMapping("/parcel/{parcelId}")
    public ApiResponse<List<ParcelAcquisitionResponse>> getByParcelId(@PathVariable String parcelId) {
        return ApiResponse.success(acquisitionService.getAcquisitionsByParcel(parcelId));
    }

    @PostMapping("/projects/{projectId}/parcels/{parcelId}/representation")
    public ApiResponse<ParcelAcquisitionResponse> submitRepresentation(
            @PathVariable String projectId,
            @PathVariable String parcelId,
            @RequestParam(required = false) String notes) {
        ParcelAcquisitionResponse response = acquisitionService.submitRepresentation(projectId, parcelId, notes);
        return ApiResponse.success("Representation submitted", response);
    }
}
