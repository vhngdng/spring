package com.example.demo.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;
@Data
@AllArgsConstructor @NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UpSertBlogRequest {
  @NotNull
  private String title;
  private String slug;
  private String description;
  private String content;
  private String thumbnail;

  private boolean status;
  private List<Integer> categoryIds;    // danh sach id category



}
