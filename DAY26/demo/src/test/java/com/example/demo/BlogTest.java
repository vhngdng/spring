package com.example.demo;

import com.example.demo.entity.Blog;
import com.example.demo.repository.BlogRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BlogTest {

  @Autowired
  private BlogRepository blogRepository;

  @Test
  void findAllPublishedBlogsTest() {
    blogRepository.findAllByPublishedAtLessThanEqualOrderByPublishedAtDesc(LocalDateTime.now());
  }

  @Test
  void findBlogsByTitleContainingIgnoreCaseTest() {
    System.out.println(blogRepository
            .findBlogsByTitleContainingIgnoreCase("Et")
            .stream()
            .map(Blog::getTitle)
            .collect(Collectors.toList()));
  }
}
