package com.hostel.management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth

                .requestMatchers("/api/auth/**").permitAll()

                .requestMatchers("/api/students/**").permitAll()

                .requestMatchers("/api/rooms/**").permitAll()

                .requestMatchers("/api/complaints/**").permitAll()

                .requestMatchers("/api/leaves/**").permitAll()

                .requestMatchers("/api/announcements/**").permitAll()

                .anyRequest().permitAll()
            );

        return http.build();
    }
}