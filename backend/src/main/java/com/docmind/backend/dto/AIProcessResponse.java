package com.docmind.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class AIProcessResponse {

    private String status;

    private String receivedFile;

    private String summary;

    private List<String> keywords;

    private List<String> entities;

}   