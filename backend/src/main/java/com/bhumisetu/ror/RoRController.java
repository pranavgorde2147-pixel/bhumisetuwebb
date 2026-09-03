package com.bhumisetu.ror;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class RoRController {

    private final RoRService roRService;

    @GetMapping("/{parcelId}/ror")
    public ApiResponse<List<RoRResponse>> getRecordOfRights(@PathVariable String parcelId) {
        return ApiResponse.success(roRService.getByParcelId(parcelId));
    }
}
