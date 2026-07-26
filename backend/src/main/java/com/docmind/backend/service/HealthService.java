package com.docmind.backend.service;

import com.docmind.backend.dto.HealthResponse;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public HealthResponse getHealthStatus() {

        return new HealthResponse(
                "UP",
                "DocMind AI",
                "1.0.0"
        );

    }
}