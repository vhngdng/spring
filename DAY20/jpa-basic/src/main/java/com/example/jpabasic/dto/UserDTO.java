package com.example.jpabasic.dto;

import jakarta.persistence.Column;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {
  private Integer id;
  private String name;
  private String email;
}
