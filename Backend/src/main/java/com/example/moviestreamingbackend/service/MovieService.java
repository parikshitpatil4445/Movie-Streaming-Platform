package com.example.moviestreamingbackend.service;

import com.example.moviestreamingbackend.model.Movie;
import com.example.moviestreamingbackend.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private com.example.moviestreamingbackend.repository.WatchlistRepository watchlistRepository;

    @Autowired
    private com.example.moviestreamingbackend.repository.WatchHistoryRepository watchHistoryRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Page<Movie> getAllMovies(Pageable pageable) {
        return movieRepository.findAll(pageable);
    }

    public Optional<Movie> getMovieById(Long id) {
        return movieRepository.findById(id);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @org.springframework.transaction.annotation.Transactional
    public void deleteMovie(Long id) {
        // First delete from watchlist to avoid foreign key constraint violation
        watchlistRepository.deleteByMovieId(id);
        // Delete from watch history as well
        watchHistoryRepository.deleteByMovieId(id);
        // Then delete the movie
        movieRepository.deleteById(id);
    }
}
