package com.example.demo.dto;

import com.example.demo.entity.AuditingEntity;
import com.example.demo.entity.Category;
import com.example.demo.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BlogDTO {
  private Integer id;
  private String title;
  private String slug;
  private String description;
  private String thumbnail;
//  @JsonFormat(pattern = "yyyy-MM-DD")
//  private LocalDateTime published_at;
  @JsonProperty("published_at")
  @JsonFormat(pattern = "yyyy-MM-DD")
  private LocalDateTime createdAt;

  private Integer userId;

  private String userName;

  private Set<CategoryDTO> categories = new LinkedHashSet<>();

}
