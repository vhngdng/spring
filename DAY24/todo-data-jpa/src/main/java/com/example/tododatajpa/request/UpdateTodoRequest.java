package com.example.tododatajpa.request;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateTodoRequest {
  @Size(min = 2, message = "Title is not valid")
  private String title;
  private boolean status;
}
