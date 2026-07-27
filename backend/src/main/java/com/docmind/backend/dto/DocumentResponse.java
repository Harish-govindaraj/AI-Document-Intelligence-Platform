package com.docmind.backend.dto;

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

    private String originalFileName;

    private String fileType;

    private Long fileSize;

    private String status;

    private LocalDateTime uploadedAt;

}