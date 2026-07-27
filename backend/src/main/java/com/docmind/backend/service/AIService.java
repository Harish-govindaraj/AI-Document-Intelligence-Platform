package com.docmind.backend.service;

import com.docmind.backend.dto.AIProcessRequest;
import com.docmind.backend.dto.AIProcessResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    private final RestTemplate restTemplate;

    @Value("${ai.service.url}")
    private String aiServiceUrl;

    public AIService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public AIProcessResponse processDocument(String filePath){

        AIProcessRequest request =
                new AIProcessRequest(filePath);

        return restTemplate.postForObject(

                aiServiceUrl + "/process",

                request,

                AIProcessResponse.class

        );

    }

}