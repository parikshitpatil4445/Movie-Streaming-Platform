package com.example.moviestreamingbackend.repository;

import com.example.moviestreamingbackend.model.WatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {
    List<WatchHistory> findByUserId(Long userId);

    void deleteByMovieId(Long movieId);
}
