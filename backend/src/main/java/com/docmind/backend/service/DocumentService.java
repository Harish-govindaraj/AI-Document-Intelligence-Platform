package com.docmind.backend.service;

import com.docmind.backend.dto.UploadResponse;
import com.docmind.backend.entity.Document;
import com.docmind.backend.repository.DocumentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.nio.file.Paths;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final FileStorageService fileStorageService;
    private final ValidationService validationService;

    public DocumentService(DocumentRepository documentRepository,
                           FileStorageService fileStorageService,
                           ValidationService validationService) {

        this.documentRepository = documentRepository;
        this.fileStorageService = fileStorageService;
        this.validationService = validationService;
    }

    public UploadResponse uploadDocument(MultipartFile file) {

        // Step 1: Validate
        validationService.validateFile(file);

        // Step 2: Store File
        String filePath = fileStorageService.storeFile(file);

        // Step 3: Create Entity
        Document document = new Document();

        document.setFileName(Paths.get(filePath).getFileName().toString());
        document.setOriginalFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setFilePath(filePath);
        document.setStatus("UPLOADED");
        document.setUploadedAt(LocalDateTime.now());

        // Step 4: Save Metadata
        Document savedDocument = documentRepository.save(document);

        // Step 5: Return Response
        return new UploadResponse(
        savedDocument.getId(),
        savedDocument.getOriginalFileName(),
        savedDocument.getFileType(),
        savedDocument.getFileSize(),
        savedDocument.getStatus(),
        savedDocument.getUploadedAt(),
        "Document uploaded successfully."
        );
    }
}