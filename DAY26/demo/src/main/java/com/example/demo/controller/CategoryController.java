package com.example.demo.controller;

import com.example.demo.request.UpSertCategoryRequest;
import com.example.demo.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/categories")
@Slf4j
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @GetMapping("/top5")
  ResponseEntity<?> findTop5Categories() {
    return ResponseEntity.ok(categoryService.findTop5Categories());
  }

  @GetMapping("/all")
  ResponseEntity<?> findAll() {
    return ResponseEntity.ok(categoryService.findAll());
  }

  @PostMapping("")
  ResponseEntity<?> createCategory(@RequestBody UpSertCategoryRequest request) {
    return new ResponseEntity<>(categoryService.createCategory(request), HttpStatus.CREATED);
  }


  @PutMapping("{id}")
  public ResponseEntity<?> updateCategory(@PathVariable Integer id, @RequestBody UpSertCategoryRequest request) {
    return ResponseEntity.ok(categoryService.updateCategory(id, request));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
    categoryService.deleteById(id);
    return ResponseEntity.notFound().build();  //204
  }

  @GetMapping("{id}")
  public ResponseEntity<?> getCategoryById(@PathVariable Integer id) {
    return ResponseEntity.ok(categoryService.getCategoryById(id));
  }

  @GetMapping("")
  ResponseEntity<?> findAllWithUsedCount() {
    return ResponseEntity.ok(categoryService.findAllWithUsedCount());
  }


}
