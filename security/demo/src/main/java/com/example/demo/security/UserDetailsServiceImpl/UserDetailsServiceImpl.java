package com.example.demo.security.UserDetailsServiceImpl;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final List<UserDetails> userDetailsList = new ArrayList<>(List.of(
          new User("dung1", new BCryptPasswordEncoder().encode("1"), List.of(new SimpleGrantedAuthority("ROLE_USER"))),
          new User("dung2", new BCryptPasswordEncoder().encode("1"), List.of(
                  new SimpleGrantedAuthority("ROLE_USER"),
                  new SimpleGrantedAuthority("ROLE_ADMIN"))
          )));
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userDetailsList.stream().filter(user ->
            user
                    .getUsername()
                    .equals(username))
            .findFirst()
            .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));
  }
}
