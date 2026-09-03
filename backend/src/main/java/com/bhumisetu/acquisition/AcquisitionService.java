package com.bhumisetu.acquisition;

import com.bhumisetu.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcquisitionService {

    private final AcquisitionRepository acquisitionRepository;
    private final ParcelAcquisitionRepository parcelAcquisitionRepository;

    public AcquisitionProjectResponse getProject(String projectId) {
        AcquisitionProject project = acquisitionRepository.findByProjectId(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Acquisition project not found: " + projectId));
        return AcquisitionProjectResponse.fromEntity(project);
    }

    public List<AcquisitionProjectResponse> getActiveProjects() {
        List<AcquisitionProject> projects = acquisitionRepository.findByStatus("ACTIVE");
        return projects.stream().map(AcquisitionProjectResponse::fromEntity).toList();
    }

    public List<ParcelAcquisitionResponse> getParcelAcquisitions(String projectId) {
        AcquisitionProject project = acquisitionRepository.findByProjectId(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Acquisition project not found: " + projectId));
        List<ParcelAcquisition> acquisitions = parcelAcquisitionRepository.findByProject(project);
        return acquisitions.stream().map(ParcelAcquisitionResponse::fromEntity).toList();
    }

    public List<ParcelAcquisitionResponse> getAcquisitionsByParcel(String parcelId) {
        List<ParcelAcquisition> acquisitions = parcelAcquisitionRepository.findByParcelId(parcelId);
        return acquisitions.stream().map(ParcelAcquisitionResponse::fromEntity).toList();
    }

    @Transactional
    public ParcelAcquisitionResponse submitRepresentation(String projectId, String parcelId, String notes) {
        AcquisitionProject project = acquisitionRepository.findByProjectId(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Acquisition project not found: " + projectId));

        List<ParcelAcquisition> acquisitions = parcelAcquisitionRepository.findByProject(project);
        ParcelAcquisition pa = acquisitions.stream()
            .filter(a -> parcelId.equals(a.getParcelId()))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Parcel " + parcelId + " not in project " + projectId));

        pa.setRepresentationStatus("SUBMITTED");
        pa.setNotes(notes);
        ParcelAcquisition saved = parcelAcquisitionRepository.save(pa);
        return ParcelAcquisitionResponse.fromEntity(saved);
    }
}
