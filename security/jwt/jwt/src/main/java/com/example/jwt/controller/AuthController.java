package com.example.jwt.controller;

import com.example.jwt.request.LoginRequest;
import com.example.jwt.security.JwtTokenUtil;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {

  @Autowired
  private AuthenticationConfiguration authenticationConfiguration;
  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) throws Exception {
    log.info(loginRequest.getUsername());
    // Tao doi tuong
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            loginRequest.getUsername(),
            loginRequest.getPassword()
    );
    // Xác thực từ username và password.
    Authentication authentication = authenticationConfiguration.getAuthenticationManager().authenticate(token);

//    log.info("token " + authentication.getName());
    // Nếu không xảy ra exception tức là thông tin hợp lệ
    // Set thông tin authentication vào Security Context
    String jwtToken = jwtTokenUtil.generateToken(authentication);
    return ResponseEntity.ok(jwtToken);
  }
}
