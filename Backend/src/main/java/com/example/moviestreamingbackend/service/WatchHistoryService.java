package com.example.moviestreamingbackend.service;

import com.example.moviestreamingbackend.model.Movie;
import com.example.moviestreamingbackend.model.User;
import com.example.moviestreamingbackend.model.WatchHistory;
import com.example.moviestreamingbackend.repository.MovieRepository;
import com.example.moviestreamingbackend.repository.UserRepository;
import com.example.moviestreamingbackend.repository.WatchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchHistoryService {

    @Autowired
    private WatchHistoryRepository watchHistoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    public List<WatchHistory> getUserHistory(Long userId) {
        return watchHistoryRepository.findByUserId(userId);
    }

    public WatchHistory addToHistory(Long userId, Long movieId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        WatchHistory history = new WatchHistory();
        history.setUser(user);
        history.setMovie(movie);

        return watchHistoryRepository.save(history);
    }
}
