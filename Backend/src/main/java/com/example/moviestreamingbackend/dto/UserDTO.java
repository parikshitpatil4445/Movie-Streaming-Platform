package com.example.moviestreamingbackend.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    // Password is intentionally omitted for security in responses
    // For updates, we might want a separate UserUpdateDTO or handle it carefully
}
