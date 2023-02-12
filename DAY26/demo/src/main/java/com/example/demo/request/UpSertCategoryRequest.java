package com.example.demo.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@JsonFormat
public class UpSertCategoryRequest {
  @NotNull(message = "Name may not be null")
  private String name;
}
