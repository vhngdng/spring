package com.example.demo;

import com.example.demo.entity.Blog;
import com.example.demo.projection.BlogProjection;
import com.example.demo.projection.ResultKeyword;
import com.example.demo.repository.BlogRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class BlogTest {

  @Autowired
  private BlogRepository blogRepository;

  @Test
  void findAllPublishedBlogsTest() {
    blogRepository.findAllByPublishedAtLessThanEqualAndStatusOrderByPublishedAtDesc(LocalDateTime.now(), true);
  }

//  @Test
//  void findBlogsByTitleContainingIgnoreCaseTest() {
//    String keyword = "Et";
//    System.out.println(blogRepository
//            .findBlogsByTitle(keyword)
//            .stream()
//            .map(Blog::getTitle)
//            .collect(Collectors.toList()));
//  }

  @Test
  void findTop3CommentBlogsTest() {
    System.out.println(blogRepository.findTop3AmountComment().stream().map(Blog::getId).collect(Collectors.toList()));
  }

  @Test
  void findPublicBlogsByCategoryIdTest() {
    System.out.println(blogRepository.findPublicBlogsByCategoryId(3, PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "publishedAt")))
            .stream()
            .map(BlogProjection::getId)
            .collect(Collectors.toList()));
  }

  @Test
  void findByKeyWordTest() {
    System.out.println(blogRepository.findBlogsByTitle("dolor").stream().map(ResultKeyword::getId).collect(Collectors.toList()));


  }
}
