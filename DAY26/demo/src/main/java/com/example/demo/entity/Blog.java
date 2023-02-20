package com.example.demo.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name = "blog")
@AllArgsConstructor
@NoArgsConstructor
@Builder
//@JsonInclude(JsonInclude.Include.NON_NULL)

public class Blog extends AuditingEntity{
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column
  @NotNull
  private String title;
  @Column
  private String slug;
  @Lob
  @Column(name = "description", columnDefinition = "TEXT")
  private String description;
  @Column(name = "content", columnDefinition = "TEXT")
  @NotNull
  private String content;
  @Column
  private String thumbnail;
  @Column
  @Value(value = "true")
  private boolean status;

  @Column(name = "published_at")
  private LocalDateTime publishedAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  @JsonIgnoreProperties({"email", "password", "avatar", "createdAt", "updatedAt"})
  @JsonProperty("author")
  private User user;

  @ManyToMany(fetch = FetchType.LAZY,
          cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH})
  @JoinTable(name = "blog_category",
          joinColumns = @JoinColumn(name = "blog_id"),
          inverseJoinColumns = @JoinColumn(name = "category_id"))
  private Set<Category> categories = new LinkedHashSet<>();

  @JsonBackReference
  @OneToMany(mappedBy = "blog",
          fetch = FetchType.LAZY,
          cascade = CascadeType.ALL)
  private List<Comment> comments;

  @JsonProperty()
  public int getCommentsCount() {
    return this.comments.size();
  }

  public void addCategories(Set<Category> categories) {
    this.categories.addAll(categories);
  }

}
