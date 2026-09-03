package com.bhumisetu.gis;

import com.bhumisetu.common.ApiResponse;
import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class GisController {

    private final ParcelRepository parcelRepository;

    @GetMapping("/{parcelId}/map")
    public ApiResponse<Map<String, Object>> getParcelGeoJson(@PathVariable String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));

        Map<String, Object> feature = new LinkedHashMap<>();
        feature.put("type", "Feature");

        Map<String, Object> geometry = new LinkedHashMap<>();
        geometry.put("type", "Polygon");
        double[][] coords = {{77.1025, 28.7041}, {77.1035, 28.7041}, {77.1035, 28.7051}, {77.1025, 28.7051}, {77.1025, 28.7041}};
        geometry.put("coordinates", coords);
        feature.put("geometry", geometry);

        Map<String, Object> properties = new LinkedHashMap<>();
        properties.put("parcelId", parcel.getParcelId());
        properties.put("ulpin", parcel.getUlpin());
        properties.put("village", parcel.getVillage());
        properties.put("tehsil", parcel.getTehsil());
        properties.put("district", parcel.getDistrict());
        properties.put("state", parcel.getState());
        properties.put("areaSqM", parcel.getAreaSqM());
        properties.put("landUse", parcel.getLandUse());
        properties.put("status", parcel.getStatus());
        feature.put("properties", properties);

        Map<String, Object> geoJson = new LinkedHashMap<>();
        geoJson.put("type", "FeatureCollection");
        geoJson.put("features", java.util.List.of(feature));

        return ApiResponse.success(geoJson);
    }
}
