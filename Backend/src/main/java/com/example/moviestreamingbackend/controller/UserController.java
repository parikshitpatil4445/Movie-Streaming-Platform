package com.example.moviestreamingbackend.controller;

import com.example.moviestreamingbackend.dto.UserDTO;
import com.example.moviestreamingbackend.model.User;
import com.example.moviestreamingbackend.model.WatchHistory;
import com.example.moviestreamingbackend.model.Watchlist;
import com.example.moviestreamingbackend.service.UserService;
import com.example.moviestreamingbackend.service.WatchHistoryService;
import com.example.moviestreamingbackend.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WatchlistService watchlistService;

    @Autowired
    private WatchHistoryService watchHistoryService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName(); // In our case, username is email

        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setFullName(user.getFullname());
            userDTO.setEmail(user.getEmail());
            userDTO.setRole(user.getRole());

            Map<String, Object> response = new HashMap<>();
            response.put("user", userDTO);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody Map<String, String> updates) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (updates.containsKey("fullname")) {
                user.setFullname(updates.get("fullname"));
            }

            if (updates.containsKey("password") && !updates.get("password").isEmpty()) {
                user.setPassword(passwordEncoder.encode(updates.get("password")));
            }

            userService.updateUser(user);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // --- Watchlist ---

    @GetMapping("/watchlist")
    public ResponseEntity<?> getWatchlist() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            List<Watchlist> watchlist = watchlistService.getUserWatchlist(user.get().getId());
            Map<String, Object> response = new HashMap<>();
            response.put("watchlist", watchlist);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/watchlist")
    public ResponseEntity<?> addToWatchlist(@RequestBody Map<String, Long> request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            try {
                Long movieId = request.get("movieId");
                Watchlist item = watchlistService.addToWatchlist(user.get().getId(), movieId);
                return ResponseEntity.ok(item);
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(new HashMap<String, String>() {
                    {
                        put("message", e.getMessage());
                    }
                });
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/watchlist/{movieId}")
    public ResponseEntity<?> removeFromWatchlist(@PathVariable Long movieId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            try {
                watchlistService.removeFromWatchlist(user.get().getId(), movieId);
                Map<String, String> response = new HashMap<>();
                response.put("message", "Removed from watchlist");
                return ResponseEntity.ok(response);
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(new HashMap<String, String>() {
                    {
                        put("message", e.getMessage());
                    }
                });
            }
        }
        return ResponseEntity.notFound().build();
    }

    // --- Watch History ---

    @GetMapping("/history")
    public ResponseEntity<?> getHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            List<WatchHistory> history = watchHistoryService.getUserHistory(user.get().getId());
            Map<String, Object> response = new HashMap<>();
            response.put("history", history);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/history")
    public ResponseEntity<?> addToHistory(@RequestBody Map<String, Long> request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        Optional<User> user = userService.getUserByEmail(email);

        if (user.isPresent()) {
            try {
                Long movieId = request.get("movieId");
                WatchHistory item = watchHistoryService.addToHistory(user.get().getId(), movieId);
                return ResponseEntity.ok(item);
            } catch (RuntimeException e) {
                return ResponseEntity.badRequest().body(new HashMap<String, String>() {
                    {
                        put("message", e.getMessage());
                    }
                });
            }
        }
        return ResponseEntity.notFound().build();
    }
}
