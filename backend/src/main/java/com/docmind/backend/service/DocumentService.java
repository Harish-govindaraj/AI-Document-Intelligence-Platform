package com.docmind.backend.service;

import com.docmind.backend.dto.AIProcessResponse;
import com.docmind.backend.dto.DocumentResponse;
import com.docmind.backend.dto.UploadResponse;
import com.docmind.backend.entity.Document;
import com.docmind.backend.entity.User;
import com.docmind.backend.repository.DocumentRepository;
import com.docmind.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;
    private final ValidationService validationService;
    private final AIService aiService;

    public DocumentService(
            DocumentRepository documentRepository,
            UserRepository userRepository,
            FileStorageService fileStorageService,
            ValidationService validationService,
            AIService aiService) {

        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
        this.fileStorageService = fileStorageService;
        this.validationService = validationService;
        this.aiService = aiService;
    }

    /**
     * Upload Document
     */
    public UploadResponse uploadDocument(MultipartFile file) {

        // Step 1 - Validate
        validationService.validateFile(file);

        // Step 2 - Store File
        String filePath = fileStorageService.storeFile(file);

        // Step 3 - Logged-in User
        User currentUser = getCurrentUser();

        // Step 4 - Create Document
        Document document = new Document();

        document.setFileName(Paths.get(filePath).getFileName().toString());
        document.setOriginalFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFileSize(file.getSize());
        document.setFilePath(filePath);
        document.setStatus("UPLOADED");
        document.setUploadedAt(LocalDateTime.now());
        document.setUser(currentUser);

        // Step 5 - Save Metadata
        Document savedDocument = documentRepository.save(document);

        // Step 6 - AI Processing
        AIProcessResponse aiResponse = aiService.processDocument(file);

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

    /**
     * Get all documents of current user
     */
    /**
 * Get all documents of current user
 */
     public List<DocumentResponse> getAllDocuments() {

    User currentUser = getCurrentUser();

    return documentRepository.findByUser(currentUser)

            .stream()

            .map(document -> DocumentResponse.builder()

                    .id(document.getId())

                    .originalFileName(document.getOriginalFileName())

                    .fileType(document.getFileType())

                    .fileSize(document.getFileSize())

                    .status(document.getStatus())

                    .uploadedAt(document.getUploadedAt())

                    // AI Results
                    .summary(document.getSummary())

                    .keywords(document.getKeywords())

                    .entities(document.getEntities())

                    .build())

            .toList();
       }

    /**
     * Get one document (only if it belongs to current user)
     */
    public DocumentResponse getDocument(Long id) {

        User currentUser = getCurrentUser();

        Document document = documentRepository

                .findByIdAndUser(id, currentUser)

                .orElseThrow(() ->
                        new RuntimeException("Document not found."));

        return DocumentResponse.builder()
        .id(document.getId())
        .originalFileName(document.getOriginalFileName())
        .fileType(document.getFileType())
        .fileSize(document.getFileSize())
        .status(document.getStatus())
        .uploadedAt(document.getUploadedAt())

        .summary(document.getSummary())
        .keywords(document.getKeywords())
        .entities(document.getEntities())

        .build();
    }

    /**
     * Delete document (only if it belongs to current user)
     */
    public void deleteDocument(Long id) {

        User currentUser = getCurrentUser();

        Document document = documentRepository

                .findByIdAndUser(id, currentUser)

                .orElseThrow(() ->
                        new RuntimeException("Document not found."));

        // Delete physical file
        try {

            Files.deleteIfExists(Path.of(document.getFilePath()));

        } catch (Exception ignored) {

        }

        documentRepository.delete(document);
    }

    /**
     * Get currently authenticated user
     */
    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)

                .orElseThrow(() ->
                        new RuntimeException("User not found."));
    }
}