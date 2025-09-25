package com.hrms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hrms.dto.UserResponseDTO;
import com.hrms.model.User;
import com.hrms.repository.UserRepository;
import com.hrms.security.JwtUtil;
import com.hrms.service.UserService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody User user) {
        User savedUser = userService.register(user);

        UserResponseDTO response = new UserResponseDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getCreatedAt().toString()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
        return ResponseEntity.ok(new LoginResponse(token, user.getRole()));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        try {
            String email = jwtUtil.extractEmail(token);
            User user = userService.findByEmail(email);

            if (user == null) {
                return ResponseEntity.status(404).body("User not found");
            }

            UserResponseDTO response = new UserResponseDTO(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getCreatedAt().toString()
            );

            return ResponseEntity.ok(response);

        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            return ResponseEntity.status(401).body("Token expired");
        } catch (io.jsonwebtoken.MalformedJwtException | io.jsonwebtoken.SignatureException e) {
            return ResponseEntity.status(401).body("Invalid token");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Server error");
        }
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody User updateUser
    ) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        User existingUser = userService.findByEmail(email);

        if (updateUser.getName() != null) existingUser.setName(updateUser.getName());
        if (updateUser.getEmail() != null) existingUser.setEmail(updateUser.getEmail());
        if (updateUser.getPassword() != null && !updateUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updateUser.getPassword()));
        }

        User savedUser = userRepository.save(existingUser);

        UserResponseDTO response = new UserResponseDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getCreatedAt().toString()
        );
        return ResponseEntity.ok(response);
    }




}



@Data
class LoginRequest {
    private String email;
    private String password;
}

@Data
class LoginResponse {
    private final String token;
    private final String role;
}
