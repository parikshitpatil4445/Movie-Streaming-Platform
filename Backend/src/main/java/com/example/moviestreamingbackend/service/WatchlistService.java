package com.example.moviestreamingbackend.service;

import com.example.moviestreamingbackend.model.Movie;
import com.example.moviestreamingbackend.model.User;
import com.example.moviestreamingbackend.model.Watchlist;
import com.example.moviestreamingbackend.repository.MovieRepository;
import com.example.moviestreamingbackend.repository.UserRepository;
import com.example.moviestreamingbackend.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchlistService {

    @Autowired
    private WatchlistRepository watchlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    public List<Watchlist> getUserWatchlist(Long userId) {
        return watchlistRepository.findByUserId(userId);
    }

    public Watchlist addToWatchlist(Long userId, Long movieId) {
        if (watchlistRepository.existsByUserIdAndMovieId(userId, movieId)) {
            throw new RuntimeException("Movie already in watchlist");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        Watchlist watchlist = new Watchlist();
        watchlist.setUser(user);
        watchlist.setMovie(movie);

        return watchlistRepository.save(watchlist);
    }

    public void removeFromWatchlist(Long userId, Long movieId) {
        Optional<Watchlist> item = watchlistRepository.findByUserIdAndMovieId(userId, movieId);
        if (item.isPresent()) {
            watchlistRepository.delete(item.get());
        } else {
            throw new RuntimeException("Item not found in watchlist");
        }
    }
}
