package com.bhumisetu.registration;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final ParcelRepository parcelRepository;

    public List<RegistrationResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<RegistrationRecord> records = registrationRepository.findByParcel(parcel);
        return records.stream().map(RegistrationResponse::fromEntity).toList();
    }

    public RegistrationResponse getById(Long id) {
        RegistrationRecord record = registrationRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Registration not found: " + id));
        return RegistrationResponse.fromEntity(record);
    }

    public List<RegistrationResponse> getByDocumentNumber(String documentNumber) {
        List<RegistrationRecord> records = registrationRepository.findByDocumentNumber(documentNumber);
        return records.stream().map(RegistrationResponse::fromEntity).toList();
    }
}
