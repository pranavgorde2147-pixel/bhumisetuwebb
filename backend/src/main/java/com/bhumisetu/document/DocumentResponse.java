package com.bhumisetu.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentResponse {
    private Long id;
    private String documentId;
    private String fileName;
    private String contentType;
    private String documentType;
    private String uploadedBy;
    private String accessLevel;
    private LocalDateTime createdAt;

    public static DocumentResponse fromEntity(Document doc) {
        return DocumentResponse.builder()
            .id(doc.getId())
            .documentId(doc.getDocumentId())
            .fileName(doc.getFileName())
            .contentType(doc.getContentType())
            .documentType(doc.getDocumentType())
            .uploadedBy(doc.getUploadedBy())
            .accessLevel(doc.getAccessLevel())
            .createdAt(doc.getCreatedAt())
            .build();
    }
}
