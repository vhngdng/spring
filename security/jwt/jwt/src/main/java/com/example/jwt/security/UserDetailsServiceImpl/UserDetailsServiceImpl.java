package com.example.jwt.security.UserDetailsServiceImpl;

import com.example.jwt.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    log.info(userRepository
            .findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with : " + email)).getUsername());
    return userRepository
            .findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with : " + email));
  }
}
