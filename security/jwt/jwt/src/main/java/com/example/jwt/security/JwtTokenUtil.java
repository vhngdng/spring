package com.example.jwt.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenUtil {
  public static final String PREFIX = "Bearer ";

  // Token có hạn trong vòng 24 giờ kể từ thời điểm tạo, thời gian tính theo giây
  private final Integer duration = 24 * 60 * 60;

  // Lấy giá trị key được cấu hình trong file appliacation.properties
  // Key này sẽ được sử dụng để mã hóa và giải mã
//  private final String secret = "secret";

  private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS512);

  // Sinh token
  public String generateToken(Authentication authentication) {
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();

    // Lưu thông tin Authorities của user vào claims
    Map<String, Object> claims = new HashMap<>();
    claims.put("authorities", userDetails.getAuthorities());
    // 1. Định nghĩa các claims: issuer, expiration, subject, id
    // 2. Mã hóa token sử dụng thuật toán HS512 và key bí mật
    // 3. Convert thành chuỗi URL an toàn
    // 4. Cộng chuỗi đã sinh ra với tiền tố Bearer
    return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + duration * 1000))
            .signWith(secretKey, SignatureAlgorithm.HS512)
            .compact();

//    return PREFIX + token;
  }

  // Lấy thông tin được lưu trong token
  public Claims getClaimsFromToken(String token) {
    // Kiểm tra token có bắt đầu bằng tiền tố
    if (token == null ) return null;

    return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody();
  }

  public String getUserNameFromJwtToken(String token) {
    return getClaimsFromToken(token).getSubject();

  }

  public boolean validateJwtToken(String token) {
    try {
      return !Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject().isBlank();
    } catch (AccessDeniedException e) {
      throw new AccessDeniedException("Access denied");
    }  catch (MalformedJwtException e) {
      log.error("Invalid JWT token: {}", e.getMessage());
    } catch (ExpiredJwtException e) {
      log.error("JWT token is expired: {}", e.getMessage());
    } catch (UnsupportedJwtException e) {
      log.error("JWT token is unsupported: {}", e.getMessage());
    } catch (IllegalArgumentException e) {
      log.error("JWT claims string is empty: {}", e.getMessage());
    }
    return false;
  }
}
