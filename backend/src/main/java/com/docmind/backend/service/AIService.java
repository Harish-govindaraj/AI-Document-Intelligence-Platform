package com.docmind.backend.service;

import com.docmind.backend.dto.AIProcessResponse;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AIService {

    private final WebClient webClient;

    public AIService(WebClient webClient) {
        this.webClient = webClient;
    }

    public AIProcessResponse processDocument(MultipartFile file) {

        try {

            MultipartBodyBuilder builder = new MultipartBodyBuilder();

            builder.part(
                    "file",
                    new ByteArrayResource(file.getBytes()) {
                        @Override
                        public String getFilename() {
                            return file.getOriginalFilename();
                        }
                    });

            return webClient.post()
                    .uri("/process")
                    .contentType(MediaType.MULTIPART_FORM_DATA)
                    .bodyValue(builder.build())
                    .retrieve()
                    .bodyToMono(AIProcessResponse.class)
                    .block();

        } catch (Exception e) {
            throw new RuntimeException("Failed to communicate with AI Service.", e);
        }
    }
}