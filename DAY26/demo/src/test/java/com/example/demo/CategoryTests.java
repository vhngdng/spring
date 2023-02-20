package com.example.demo;

import com.example.demo.projection.CategoryProjection;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CategoryTests {

  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private BlogRepository blogRepository;

  @Test
  void findTop5CategoriesTest() {
    System.out.println(categoryRepository
            .findTop5Categories()
            .stream()
            .map(CategoryProjection::getUsed)
            .collect(Collectors.toList()));
  }

  @Test
  void findAllByPublishedAtLessThanEqualOrderByPublishedAtDescTest() {
    LocalDateTime now = LocalDateTime.now();
    System.out.println(blogRepository.findAllByPublishedAtLessThanEqualAndStatusOrderByPublishedAtDesc(now, PageRequest.of(0, 2), true));
  }

  @Test
  void findCategoriesWithUsedCountTest() {
    System.out.println(categoryRepository.findCategoriesWithUsedCount()
            .stream()
            .map(CategoryProjection::getUsed)
            .collect(Collectors.toList()));
  }

  @Test
  void findAllCategoryTest() {
    System.out.println(categoryRepository.findAllCategories().stream().map(CategoryProjection::getUsed).toList());
  }
}
