package com.example.demo.projection;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Lob;

import java.time.LocalDateTime;

public interface CommentProjection {
  Integer getId();
  String getName();
  String getAvatar();

  @JsonProperty(value = "published_at")
  @JsonFormat(pattern = "yyyy-MM-DD")
  LocalDateTime getCreatedAt();
  @Lob
  String getContent();
}
