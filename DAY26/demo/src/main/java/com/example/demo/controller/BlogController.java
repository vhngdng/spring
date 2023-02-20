package com.example.demo.controller;

import com.example.demo.dto.BlogDTO;
import com.example.demo.entity.Blog;
import com.example.demo.projection.BlogProjection;
import com.example.demo.projection.ResultKeyword;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin/blogs")
@Slf4j
public class BlogController {

  @Autowired
  private BlogService blogService;

  @GetMapping("/simplifyBlogs")
  ResponseEntity<?> findAllWithCreatedDESC() {
    return ResponseEntity.ok(blogService.findAllWithCreatedDESC());
  }

  @GetMapping("/publicBlogs")
  ResponseEntity<?> findPagingPublicBlogs(@RequestParam(name = "page", defaultValue = "0") int page,
                                          @RequestParam(name = "size", defaultValue = "10") int size) {
    Pageable paging = PageRequest.of(page, size, Sort.by("createdAt").descending());
    return ResponseEntity.ok(blogService.findPagingPublicBlogs(paging));
  }

  @GetMapping("/all-published-blogs")
  ResponseEntity<?> findAllPublishedBlogs() {
    return ResponseEntity.ok(blogService.findAllPublishedBlogs());
  }

  @GetMapping("/top3-comment-blogs")
  ResponseEntity<?> findTop3CommentPublicBlogs() {
    return ResponseEntity.ok(blogService.findTop3CommentBlogs(PageRequest.of(0, 3)));
  }

  @GetMapping("/categories/{categoryId}")
  ResponseEntity<?> findPublicBlogsByCategoryId(@PathVariable("categoryId") @NotNull Integer id,
                                                @RequestParam(name = "page", defaultValue = "0") int page,
                                                @RequestParam(name = "size", defaultValue = "10") int size) {
    log.info(String.valueOf(page));
    return ResponseEntity.ok(blogService.findPublicBlogsByCategoryId(id, page, size));
  }

  @GetMapping("/author")
  ResponseEntity<?> findPublicBlogsByUserId(@RequestParam("authorId") @NotNull Integer id) {
    return ResponseEntity.ok(blogService.findPublicBlogsByUserId(id));
  }

  @GetMapping("/search")
  ResponseEntity<?> findBlogsByKeyword(@RequestParam("keyword") @NotNull String keyword) {
    log.info(blogService.findByKeyword(keyword).stream().map(ResultKeyword::getId).toList().toString());
    return ResponseEntity.ok(blogService.findByKeyword(keyword));
  }

  @GetMapping("")
  public ResponseEntity<?> getAllBlogs(@RequestParam(name = "page", defaultValue = "0") int page,
                                       @RequestParam(name = "size", defaultValue = "10") int size) {
    return ResponseEntity.ok(blogService.getAllBlog(page, size));
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

  @GetMapping("all-id-blogs")
  ResponseEntity<?> findAllIdBlogs() {
    return ResponseEntity.ok(blogService.findAllIdBlogs());
  }
}
