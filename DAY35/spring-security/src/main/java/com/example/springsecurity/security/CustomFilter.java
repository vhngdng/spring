package com.example.springsecurity.security;

import com.example.springsecurity.security.UserDetailsServiceImpl.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class CustomFilter extends OncePerRequestFilter {
  @Autowired
  UserDetailsServiceImpl userDetailsServiceImpl;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    String username = (String) request.getSession().getAttribute("TECHMASTER_SESSION");
    log.info("username =" + username);

    // Tạo object Authentication
    if (username == null) {
      filterChain.doFilter(request, response);
      return;
    }
    // Lấy thông tin user
    UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);

    //Tạo đối tượng xác thực
    UsernamePasswordAuthenticationToken token =
            new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());


    // Xác thực thành công, lưu object Authentication vào SecurityContextHolder
    SecurityContextHolder.getContext().setAuthentication(token);
    filterChain.doFilter(request, response);
  }


}
