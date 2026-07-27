package com.docmind.backend.controller;

import com.docmind.backend.dto.DocumentResponse;
import com.docmind.backend.dto.UploadResponse;
import com.docmind.backend.service.DocumentService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {

        this.documentService = documentService;

    }

    /**
     * Upload document
     */
    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public UploadResponse uploadDocument(
            @RequestParam("file") MultipartFile file) {

        return documentService.uploadDocument(file);

    }

    /**
     * Get all uploaded documents
     */
    @GetMapping
    public List<DocumentResponse> getAllDocuments() {

        return documentService.getAllDocuments();

    }

    /**
     * Get document by ID
     */
    @GetMapping("/{id}")
    public DocumentResponse getDocument(
            @PathVariable Long id) {

        return documentService.getDocument(id);

    }

    /**
     * Delete document
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(
            @PathVariable Long id) {

        documentService.deleteDocument(id);

        return ResponseEntity.ok("Document deleted successfully.");

    }

}