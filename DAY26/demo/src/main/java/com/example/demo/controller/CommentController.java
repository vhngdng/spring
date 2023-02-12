package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.projection.CommentProjection;
import com.example.demo.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/comments")
@Slf4j
public class CommentController {


  @Autowired
  private CommentService commentService;

  @GetMapping("/blog")
  List<CommentProjection> findCommentWithBlogId(@RequestParam("blogId") int blogId) {
    return commentService.findCommentWithBlogId(blogId);
  }
}
