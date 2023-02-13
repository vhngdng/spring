package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter @Setter
public abstract class AuditingEntity {
  @Column(name = "created_at")
  private LocalDateTime createdAt;
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;
  @PrePersist
  public void prePersist() {
    this.createdAt = LocalDateTime.now();
  }
  @PostUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
