package com.docmind.backend.service;

import com.docmind.backend.dto.AIProcessResponse;
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
    private final AIService aiService;

    public DocumentService(DocumentRepository documentRepository,
                           FileStorageService fileStorageService,
                           ValidationService validationService,
                           AIService aiService) {

        this.documentRepository = documentRepository;
        this.fileStorageService = fileStorageService;
        this.validationService = validationService;
        this.aiService = aiService;
    }

    public UploadResponse uploadDocument(MultipartFile file){

    // Step 1
    validationService.validateFile(file);

    // Step 2
    String filePath = fileStorageService.storeFile(file);

    // Step 3
    Document document = new Document();

    document.setFileName(Paths.get(filePath).getFileName().toString());
    document.setOriginalFileName(file.getOriginalFilename());
    document.setFileType(file.getContentType());
    document.setFileSize(file.getSize());
    document.setFilePath(filePath);
    document.setStatus("UPLOADED");
    document.setUploadedAt(LocalDateTime.now());

    // Step 4
    Document savedDocument = documentRepository.save(document);

    // ⭐ Step 5 - Call FastAPI
    AIProcessResponse aiResponse =
            aiService.processDocument(filePath);

    // ⭐ Step 6 - Print AI Response
    System.out.println("========== AI RESPONSE ==========");
    System.out.println("Summary : " + aiResponse.getSummary());
    System.out.println("Keywords: " + aiResponse.getKeywords());
    System.out.println("Entities: " + aiResponse.getEntities());
    System.out.println("=================================");

    // Step 7
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
