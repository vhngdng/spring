package com.example.demo.controller;

import com.example.demo.dto.BlogDTO;
import com.example.demo.entity.Blog;
import com.example.demo.projection.BlogProjection;
import com.example.demo.request.UpSertBlogRequest;
import com.example.demo.service.BlogService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/blogs")
@Slf4j
public class BlogController {

  @Autowired
  private BlogService blogService;

  @GetMapping("/simplifyBlogs")
  List<BlogProjection> findAllWithCreatedDESC() {
    return blogService.findAllWithCreatedDESC();
  }

  @GetMapping("/publicBlogs")
  Page<Blog> findPagingPublicBlogs(@RequestParam(name = "page",defaultValue = "0") int page,
                                @RequestParam(name = "size", defaultValue = "2") int size) {
    Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
    return blogService.findPagingPublicBlogs(paging);
  }
  @GetMapping("/all-published-blogs")
  List<Blog> findAllPublishedBlogs() {
    return blogService.findAllPublishedBlogs();
  }

  @GetMapping("/top3-comment-blogs")
  Page<Blog> findAllPublicBlogs() {
    return blogService.findTop3CommentBlogs(PageRequest.of(0, 3));
  }

  @GetMapping("/categories/{categoryId}")
  List<BlogProjection> findPublicBlogsByCategoryId(@PathVariable("categoryId") @NotNull Integer id) {
    return blogService.findPublicBlogsByCategoryId(id);
  }

  @GetMapping("/author")
  List<BlogProjection> findPublicBlogsByUserId(@RequestParam("authorId") @NotNull Integer id) {
    return blogService.findPublicBlogsByUserId(id);
  }

  @GetMapping("/search")
  List<Blog> findBlogsByKeywordTitle(@RequestParam("keyword") @NotNull String keyword) {
    return blogService.findBlogsByKeywordTitle(keyword);
  }
  @GetMapping("")
  public ResponseEntity<?> getAllBlogs() {
    return ResponseEntity.ok(blogService.getAllBlog());
  }

  @PostMapping("")
  public ResponseEntity<?> createBlog(@RequestBody UpSertBlogRequest request) {
    return new ResponseEntity<>(blogService.createBlog(request), HttpStatus.CREATED);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getBlogById(@PathVariable Integer id) {
    return ResponseEntity.ok(blogService.getBlogById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateBlog(@PathVariable Integer id, @RequestBody UpSertBlogRequest request) {
    return ResponseEntity.ok(blogService.updateBlog(id, request));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteBlog(@PathVariable Integer id) {
    blogService.deleteById(id);
    return ResponseEntity.notFound().build();  //204
  }

  }
