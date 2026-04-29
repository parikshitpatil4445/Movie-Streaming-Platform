package com.example.moviestreamingbackend.repository;

import com.example.moviestreamingbackend.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    // Add custom queries if needed, e.g., findByGenre
}
