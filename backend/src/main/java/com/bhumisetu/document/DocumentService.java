package com.bhumisetu.document;

import com.bhumisetu.common.ResourceNotFoundException;
import com.bhumisetu.parcel.Parcel;
import com.bhumisetu.parcel.ParcelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ParcelRepository parcelRepository;

    @Value("${app.storage.documents-path}")
    private String documentsPath;

    public List<DocumentResponse> getByParcelId(String parcelId) {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));
        List<Document> docs = documentRepository.findByParcel(parcel);
        return docs.stream().map(DocumentResponse::fromEntity).toList();
    }

    public DocumentResponse getById(Long id) {
        Document doc = documentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Document not found: " + id));
        return DocumentResponse.fromEntity(doc);
    }

    public byte[] getDocumentContent(Long id) throws IOException {
        Document doc = documentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Document not found: " + id));
        Path filePath = Paths.get(doc.getFilePath());
        if (!Files.exists(filePath)) {
            throw new ResourceNotFoundException("Document file not found on disk");
        }
        return Files.readAllBytes(filePath);
    }

    public DocumentResponse storeDocument(String parcelId, String fileName, String contentType, String documentType, String uploadedBy) throws IOException {
        Parcel parcel = parcelRepository.findByParcelId(parcelId)
            .orElseThrow(() -> new ResourceNotFoundException("Parcel not found: " + parcelId));

        String documentId = "DOC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String dirPath = documentsPath + "/" + parcelId;
        new File(dirPath).mkdirs();
        String filePath = dirPath + "/" + documentId + "_" + fileName;

        Document doc = Document.builder()
            .parcel(parcel)
            .documentId(documentId)
            .fileName(fileName)
            .contentType(contentType)
            .filePath(filePath)
            .documentType(documentType)
            .uploadedBy(uploadedBy)
            .accessLevel("RESTRICTED")
            .build();

        Document saved = documentRepository.save(doc);
        return DocumentResponse.fromEntity(saved);
    }
}
