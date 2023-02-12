package com.example.demo.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpSertUserRequest {
//  @NotNull(message = "Name may not be null")
  private String name;
  private String email;
  private String avatar;
  private String password;
}
