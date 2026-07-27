package com.docmind.backend.service;

import com.docmind.backend.dto.auth.AuthResponse;
import com.docmind.backend.dto.auth.LoginRequest;
import com.docmind.backend.dto.auth.RegisterRequest;
import com.docmind.backend.entity.User;
import com.docmind.backend.repository.UserRepository;
import com.docmind.backend.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;

    }

    public String register(RegisterRequest request) {

        // Email already exists
        if(userRepository.findByEmail(request.getEmail()).isPresent()){

            throw new RuntimeException("Email already registered.");

        }

        User user = User.builder()

                .fullName(request.getFullName())

                .email(request.getEmail())

                .password(
                        passwordEncoder.encode(request.getPassword())
                )

                .role("ROLE_USER")

                .createdAt(LocalDateTime.now())

                .build();

        userRepository.save(user);

        return "User registered successfully.";

    }
    public AuthResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() ->
                    new RuntimeException("Invalid email or password."));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid email or password.");
    }

    String token =
        jwtService.generateToken(user.getEmail());

return new AuthResponse(
        token,
        "Login successful."
);
}

}