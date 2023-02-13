package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;

@Entity
@Table(name = "user")
@Builder
@Data
@NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User extends AuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id", nullable = false)
  private Integer id;
  @Column(unique = true, nullable = false)
  @Size(min = 6, max = 64, message = "name is not valid")
  private String name;
  @Column(name = "email", nullable = false, unique = true)
  @Email
  private String email;
  @Column
  private String avatar;
  @Column
  private String password;

  public User(String name, String email, String avatar, String password) {
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.password = password;
  }

  public User(Integer id, String name) {
    this.id = id;
    this.name = name;
  }
}
