package com.docmind.backend.controller;

import com.docmind.backend.dto.UploadResponse;
import com.docmind.backend.service.DocumentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public UploadResponse uploadDocument(
            @RequestParam("file") MultipartFile file) {

        return documentService.uploadDocument(file);

    }

}