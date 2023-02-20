package com.example.demo;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Category;
import com.example.demo.entity.Comment;
import com.example.demo.entity.User;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.UserRepository;
import com.github.javafaker.Faker;
import com.github.slugify.Slugify;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InitData {

  @Autowired
  private Faker faker;

  @Autowired
  private Slugify slugify;

  @Autowired
  private UserRepository userRepository;
  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private BlogRepository blogRepository;
  @Autowired
  private CommentRepository commentRepository;

  @Test
  @Rollback(value = false)
  void save_user() {
    for(int i = 0; i< 5; i++) {
      User user = User.builder()
              .name(faker.name().fullName())
              .email(faker.internet().emailAddress())
              .password(faker.internet().password())
              .build();

      userRepository.save(user);
    }
  }

  @Test
  @Rollback(value = false)
  void save_category() {
    for(int i = 0; i< 5; i++) {
      Category category = Category.builder()
              .name(faker.leagueOfLegends().champion())
              .build();
      categoryRepository.save(category);
    }
  }

  @Test
  @Rollback(value = false)
  void save_blog() {
    Random rd = new Random();
    List<User> users = userRepository.findAll();
    List<Category> categories = categoryRepository.findAll();
    System.out.println(rd.nextInt(users.size()));
    for(int i = 0; i< 5; i++) {
      //Rd 1 user
      User rdUser = users.get(rd.nextInt(users.size()));

      //Rd 1 list category
      Set<Category> rdCategories = new LinkedHashSet<>();
      for(int j = 0; j < 3; j++) {
        Category rdCategory = categories.get(rd.nextInt(categories.size()));
        rdCategories.add(rdCategory);
      }

      String title = faker.lorem().sentence(10);
      Blog blog = Blog.builder()
              .title(title)
              .slug(slugify.slugify(title))
              .description(faker.lorem().sentence(20))
              .content(faker.lorem().sentence(100))
              .status(rd.nextInt() != 1)
              .publishedAt(LocalDateTime.now().minusMinutes(rd.nextLong(100000)))
              .user(rdUser)
              .categories(rdCategories)
              .build();

      blogRepository.save(blog);
    }
  }

  @Test
  @Rollback(value = false)
  void save_comment() {
    Random rd = new Random();
    List<Blog> blogs = blogRepository.findAll();
    List<User> users = userRepository.findAll();
    for(int i = 0; i< 10; i++) {
      Comment comment = Comment.builder()
              .blog(blogs.get(rd.nextInt(blogs.size())))
              .user(users.get(rd.nextInt(users.size())))
              .build();
      commentRepository.save(comment);
    }
  }

  @Test
  void findAllWithCreatedDESCTest() {
    System.out.println(blogRepository.findAllWithCreatedDESC().get(1).getAuthor().getName());
  }

  @Test
  void findTop5CategoriesTest() {
    System.out.println(categoryRepository.findTop5Categories());
  }
  @Test
  void findPublicBlogsByCategoryIdTest() {
    System.out.println(blogRepository.findPublicBlogsByCategoryId(3, PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "publishedAt"))));
  }
}
