package com.docmind.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadResponse {

    private Long id;

    private String originalFileName;

    private String fileType;

    private Long fileSize;

    private String status;

    private LocalDateTime uploadedAt;

    // AI Results
    private String summary;

    private List<String> keywords;

    private List<EntityResponse> entities;

    private String message;
}