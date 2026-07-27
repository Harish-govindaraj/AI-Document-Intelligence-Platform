package com.docmind.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {

    @Bean
    public WebClient webClient(
            @Value("${ai.service.url}") String aiServiceUrl) {

        return WebClient.builder()
                .baseUrl(aiServiceUrl)
                .build();

    }

}