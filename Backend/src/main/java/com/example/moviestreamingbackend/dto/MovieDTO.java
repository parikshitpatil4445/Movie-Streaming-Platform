package com.example.moviestreamingbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MovieDTO {
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Release year is required")
    private Integer releaseYear;

    private String genre;
    private String poster;
    private String videoId;
    private String createdBy;
}
