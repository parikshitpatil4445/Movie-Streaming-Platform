package com.example.moviestreamingbackend.controller;

import com.example.moviestreamingbackend.dto.MovieDTO;
import com.example.moviestreamingbackend.model.Movie;
import com.example.moviestreamingbackend.model.User;
import com.example.moviestreamingbackend.service.MovieService;
import com.example.moviestreamingbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('admin')") // Ensure only admins can access
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private MovieService movieService;

    // --- User Management ---

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        Map<String, Object> response = new HashMap<>();
        response.put("users", users);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    // --- Movie Management ---

    @GetMapping("/movies")
    public ResponseEntity<?> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        Map<String, Object> response = new HashMap<>();
        response.put("movies", movies);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/movies")
    public ResponseEntity<?> addMovie(@RequestBody MovieDTO movieDTO) {
        Movie movie = new Movie();
        movie.setTitle(movieDTO.getTitle());
        movie.setDescription(movieDTO.getDescription());
        movie.setReleaseYear(movieDTO.getReleaseYear());
        movie.setGenre(movieDTO.getGenre());
        movie.setPoster(movieDTO.getPoster());
        movie.setVideoId(movieDTO.getVideoId());
        movie.setCreatedBy(movieDTO.getCreatedBy());

        Movie savedMovie = movieService.addMovie(movie);
        return ResponseEntity.ok(savedMovie);
    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Movie deleted successfully");
        return ResponseEntity.ok(response);
    }
}
