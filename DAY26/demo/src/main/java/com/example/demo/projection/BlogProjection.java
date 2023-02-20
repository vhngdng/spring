package com.example.demo.projection;


import com.example.demo.entity.Category;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
//import lombok.ToString;
//import net.minidev.json.JSONObject;


import java.time.LocalDateTime;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public interface BlogProjection {
  Integer getId();
  String getTitle();
  String getSlug();
  String getDescription();
  String getThumbnail();
  String getContent();
  boolean getStatus();
  @JsonFormat(pattern = "yyyy-MM-DD")
  LocalDateTime getCreatedAt();
//  @JsonFormat(pattern = "yyyy-MM-DD")
  LocalDateTime getPublishedAt();
  @JsonInclude(JsonInclude.Include.NON_NULL)
  @JsonProperty("category")
  Set<Category> getCategories();

  Integer getCountComment();
  @JsonIgnore
  Integer getUserId();
  @JsonIgnore
  String getUserName();
  @JsonIgnore
  Integer getCategoryId();
  @JsonIgnore
  String getCategoryName();
  @Getter @Setter
  @AllArgsConstructor
  class UserSimplify {
   Integer id;
   String name;
  }
  @Getter @Setter
  @AllArgsConstructor
  class CategorySimplify {
    Integer id;
    String name;
  }


  default UserSimplify getAuthor() {
    return new UserSimplify(getUserId(), getUserName());
  }

  default CategorySimplify getCategory() {

      return new CategorySimplify(getCategoryId(), getCategoryName());

  }
}
