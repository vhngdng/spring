package com.example.springsecurity.security;

import com.example.springsecurity.security.UserDetailsServiceImpl.UserDetailsServiceImpl;
import com.example.springsecurity.security.entryPoint.CustomAccessDenied;
import com.example.springsecurity.security.entryPoint.CustomAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@EnableWebSecurity
@Configuration
public class WebSecurityConfig {
//
  @Autowired
  private CustomFilter customFilter;
  @Autowired
  @Qualifier("customAuthenticationEntryPoint")
  CustomAuthenticationEntryPoint authEntryPoint;
  @Autowired
  CustomAccessDenied accessDenied;
  @Bean
  public UserDetailsServiceImpl userDetailsService() {
    return new UserDetailsServiceImpl();
  };
  @Bean
  BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

//  @Bean
//  public InMemoryUserDetailsManager userDetail() {
//    UserDetails user = User.withUsername("dung1")
//            .password(passwordEncoder().encode("1"))
//            .roles("USER")
//            .build();
//    UserDetails admin = User.withUsername("dung2")
//            .password(passwordEncoder().encode("1"))
//            .roles("ADMIN", "USER")
//            .build();
//
//    return new InMemoryUserDetailsManager(user, admin);
//  }


  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors()
            .and()
            .csrf()
            .disable()
            .authorizeHttpRequests()
              .requestMatchers("/", "/auth/**")
              .permitAll()
              .requestMatchers("/admin/**")
              .hasRole("ADMIN")
              .requestMatchers("/user/**")
              .hasAnyRole("ADMIN", "USER")
              .anyRequest()
              .authenticated()
            .and()
              .exceptionHandling()
              .authenticationEntryPoint(authEntryPoint)
              .accessDeniedHandler(accessDenied)
            .and()
            .authenticationProvider(provider())
            .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class)
            .formLogin()
            .and()
            .httpBasic()
            .and()
            .logout();

    return http.build();
  }

  @Bean
  DaoAuthenticationProvider provider() {
    DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
    authenticationProvider.setPasswordEncoder(passwordEncoder());
    authenticationProvider.setUserDetailsService(userDetailsService());
    return authenticationProvider;
  }


}
