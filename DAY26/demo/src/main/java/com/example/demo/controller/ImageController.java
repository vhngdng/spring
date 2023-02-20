package com.example.demo.controller;

import com.example.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/images")
public class ImageController {


  @Autowired
  private ImageService imageService;

  // Lấy danh sách ảnh của user
  @GetMapping("")
  public ResponseEntity<?> getAllImages() {
    return ResponseEntity.ok(imageService.getAllImage());
  }

  // Xem ảnh
  @GetMapping("/{id}")
  public ResponseEntity<?> readImage(@PathVariable int id) {
    return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(imageService.readImage(id));
  }

  @GetMapping("pdf/{id}")
  public ResponseEntity<byte[]> readPdf(@PathVariable int id) {
    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .body(imageService.readImage(id));
  }

  // Upload ảnh
  @PostMapping("")
  public ResponseEntity<?> uploadImage(@ModelAttribute("file") MultipartFile file) {
    return new ResponseEntity<>(imageService.uploadImage(file), HttpStatus.CREATED);
  }

  // Xoá ảnh
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteImage(@PathVariable Integer id) {
    imageService.deleteImage(id);
    return ResponseEntity.noContent().build();
  }

}
