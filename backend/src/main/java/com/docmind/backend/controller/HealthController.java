package com.docmind.backend.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import com.docmind.backend.dto.HealthResponse;
@RestController
public class HealthController {
      @GetMapping("/health")
      public HealthResponse k(){
        return new HealthResponse(
            "UP",
            "DocMind AI",
            "1.0.0"
        );

      }
}
