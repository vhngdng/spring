package com.example.jwt.security;

import com.example.jwt.security.UserDetailsServiceImpl.UserDetailsServiceImpl;
import com.example.jwt.security.entryPoint.CustomAccessDenied;
import com.example.jwt.security.entryPoint.CustomAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


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
