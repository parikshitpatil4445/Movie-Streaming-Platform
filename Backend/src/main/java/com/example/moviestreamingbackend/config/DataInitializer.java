package com.example.moviestreamingbackend.config;

import com.example.moviestreamingbackend.model.User;
import com.example.moviestreamingbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        User admin = userRepository.findByEmail("admin@test.com").orElse(new User());
        admin.setFullname("Admin User");
        admin.setEmail("admin@test.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("admin");
        userRepository.save(admin);
        System.out.println("Default admin user updated/created: admin@test.com / admin123");
    }
}
