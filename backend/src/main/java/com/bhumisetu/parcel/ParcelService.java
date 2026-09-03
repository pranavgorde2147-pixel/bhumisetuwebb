package com.bhumisetu.parcel;

import com.bhumisetu.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParcelService {

    private final ParcelRepository parcelRepository;

    public ParcelSearchResult searchParcels(ParcelSearchRequest request) {
        PageRequest pageRequest = PageRequest.of(request.getPage(), request.getSize(), Sort.by("id"));

        Page<Parcel> parcels = parcelRepository.searchParcels(
            request.getVillage(),
            request.getTehsil(),
            request.getDistrict(),
            request.getState(),
            request.getSurveyNumber(),
            request.getKhasraNumber(),
            request.getKhataNumber(),
            request.getLandUse(),
            request.getStatus(),
            pageRequest
        );

        return ParcelSearchResult.builder()
            .parcels(parcels.getContent().stream().map(ParcelResponse::fromEntity).toList())
            .totalElements(parcels.getTotalElements())
            .totalPages(parcels.getTotalPages())
            .page(parcels.getNumber())
            .size(parcels.getSize())
            .build();
    }

    public ParcelResponse getById(Long id) {
        Parcel parcel = parcelRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found with id: " + id));
        return ParcelResponse.fromEntity(parcel);
    }

    public ParcelResponse getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found with parcelId: " + parcelId));
        return ParcelResponse.fromEntity(parcel);
    }

    public ParcelSearchResult searchByQuery(String query, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("id"));
        Page<Parcel> parcels = parcelRepository.searchByQuery(query, pageRequest);

        return ParcelSearchResult.builder()
            .parcels(parcels.getContent().stream().map(ParcelResponse::fromEntity).toList())
            .totalElements(parcels.getTotalElements())
            .totalPages(parcels.getTotalPages())
            .page(parcels.getNumber())
            .size(parcels.getSize())
            .build();
    }
}
