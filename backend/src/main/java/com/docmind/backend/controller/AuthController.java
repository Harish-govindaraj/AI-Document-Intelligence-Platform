package com.docmind.backend.controller;

import com.docmind.backend.dto.auth.AuthResponse;
import com.docmind.backend.dto.auth.LoginRequest;
import com.docmind.backend.dto.auth.RegisterRequest;
import com.docmind.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {

        this.authService = authService;

    }

    @PostMapping("/register")
    public String register(

            @RequestBody RegisterRequest request

    ) {

        return authService.register(request);

    }
    @PostMapping("/login")
        public AuthResponse login(
                @RequestBody LoginRequest request) {

            return authService.login(request);

    }

}