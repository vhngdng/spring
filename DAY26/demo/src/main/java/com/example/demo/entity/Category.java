package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "category")
@Builder
@Data
@AllArgsConstructor @NoArgsConstructor
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column(unique = true, nullable = false)
  private String name;

//  @ManyToMany(mappedBy = "categories", fetch = FetchType.EAGER)
//  private Set<Blog> blogs = new LinkedHashSet<>();

  public Category(String name) {
    this.name = name;
  }


}
