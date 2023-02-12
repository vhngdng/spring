package com.example.tododatajpa.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Todo {
//  id : int - id của công việc
//  title : String - tiêu đề của công việc
//  status : boolean - trạng thái của công việc (hoàn thành - chưa hoàn thành)
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;
  @Column(name = "title")
  private String title;
  @Column(name = "status")
  private boolean status;

  @PrePersist
  public void prePersist() {
    status = false;
  }

  public Todo(String title) {
    this.title = title;
  }
}
