package com.bhumisetu.document;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/parcels")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @GetMapping("/{parcelId}/documents")
    public ApiResponse<List<DocumentResponse>> getDocuments(@PathVariable String parcelId) {
        return ApiResponse.success(documentService.getByParcelId(parcelId));
    }

    @GetMapping("/documents/{id}")
    public ApiResponse<DocumentResponse> getDocumentById(@PathVariable Long id) {
        return ApiResponse.success(documentService.getById(id));
    }

    @GetMapping("/documents/{id}/download")
    public ResponseEntity<ByteArrayResource> downloadDocument(@PathVariable Long id) throws IOException {
        byte[] content = documentService.getDocumentContent(id);
        DocumentResponse doc = documentService.getById(id);

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getFileName() + "\"")
            .contentType(MediaType.parseMediaType(doc.getContentType()))
            .contentLength(content.length)
            .body(new ByteArrayResource(content));
    }

    @PostMapping("/{parcelId}/documents")
    public ApiResponse<DocumentResponse> uploadDocument(
            @PathVariable String parcelId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "documentType", defaultValue = "OTHER") String documentType) throws IOException {
        DocumentResponse response = documentService.storeDocument(
            parcelId,
            file.getOriginalFilename(),
            file.getContentType(),
            documentType,
            "SYSTEM"
        );
        return ApiResponse.created(response);
    }
}
