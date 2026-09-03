package com.bhumisetu.servicerequest;

import com.bhumisetu.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;

    public List<ServiceRequestResponse> getByParcelId(String parcelId) {
        List<ServiceRequest> requests = serviceRequestRepository.findByParcelId(parcelId);
        return requests.stream().map(ServiceRequestResponse::fromEntity).toList();
    }

    public ServiceRequestResponse getById(Long id) {
        ServiceRequest sr = serviceRequestRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Service request not found: " + id));
        return ServiceRequestResponse.fromEntity(sr);
    }

    public ServiceRequestResponse getByRequestId(String requestId) {
        ServiceRequest sr = serviceRequestRepository.findByRequestId(requestId)
            .orElseThrow(() -> new ResourceNotFoundException("Service request not found: " + requestId));
        return ServiceRequestResponse.fromEntity(sr);
    }

    @Transactional
    public ServiceRequestResponse create(ServiceRequestCreateRequest request) {
        ServiceRequest sr = ServiceRequest.builder()
            .requestId("SR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
            .requestType(request.getRequestType())
            .parcelId(request.getParcelId())
            .citizenName(request.getCitizenName())
            .citizenPhone(request.getCitizenPhone())
            .description(request.getDescription())
            .status("OPEN")
            .build();

        ServiceRequest saved = serviceRequestRepository.save(sr);
        return ServiceRequestResponse.fromEntity(saved);
    }

    public List<ServiceRequestResponse> getOpenRequests() {
        List<ServiceRequest> requests = serviceRequestRepository.findByStatus("OPEN");
        return requests.stream().map(ServiceRequestResponse::fromEntity).toList();
    }
}
