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

    public UploadResponse uploadDocument(MultipartFile file) {

    // Step 1 - Validate file
    validationService.validateFile(file);

    // Step 2 - Store file
    String filePath = fileStorageService.storeFile(file);

    // Step 3 - Create Document Entity
    Document document = new Document();

    document.setFileName(Paths.get(filePath).getFileName().toString());
    document.setOriginalFileName(file.getOriginalFilename());
    document.setFileType(file.getContentType());
    document.setFileSize(file.getSize());
    document.setFilePath(filePath);
    document.setStatus("UPLOADED");
    document.setUploadedAt(LocalDateTime.now());

    // Step 4 - Save document metadata
    Document savedDocument = documentRepository.save(document);

    // Step 5 - Send file to AI Service
    AIProcessResponse aiResponse = aiService.processDocument(file);

    // Step 6 - Save AI Results
    savedDocument.setSummary(aiResponse.getSummary());

    savedDocument.setKeywords(
            String.join(", ", aiResponse.getKeywords())
    );

    savedDocument.setEntities(
            aiResponse.getEntities()
                    .stream()
                    .map(entity ->
                            entity.getText() + " (" + entity.getLabel() + ")")
                    .reduce((a, b) -> a + ", " + b)
                    .orElse("")
    );

    documentRepository.save(savedDocument);

    // Step 7 - Debug Output
    System.out.println("\n========== AI RESULT ==========");

    System.out.println("\nSUMMARY:");
    System.out.println(aiResponse.getSummary());

    System.out.println("\nKEYWORDS:");
    aiResponse.getKeywords().forEach(System.out::println);

    System.out.println("\nENTITIES:");
    aiResponse.getEntities().forEach(entity ->
            System.out.println(entity.getText() + " -> " + entity.getLabel())
    );

    System.out.println("\n===============================");

    // Step 8 - Return Response
    return new UploadResponse(

            savedDocument.getId(),

            savedDocument.getOriginalFileName(),

            savedDocument.getFileType(),

            savedDocument.getFileSize(),

            savedDocument.getStatus(),

            savedDocument.getUploadedAt(),

            aiResponse.getSummary(),

            aiResponse.getKeywords(),

            aiResponse.getEntities(),

            "Document uploaded successfully."

    );
   }
 }
