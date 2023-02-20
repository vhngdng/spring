package com.example.demo.service;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Category;
import com.example.demo.entity.User;
import com.example.demo.exception.NotFoundException;
import com.example.demo.projection.BlogProjection;
import com.example.demo.projection.ResultKeyword;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.UpSertBlogRequest;
import com.github.slugify.Slugify;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BlogService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private BlogRepository blogRepository;
  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private Slugify slugify;

  public List<BlogProjection> findAllWithCreatedDESC() {
    return blogRepository.findAllWithCreatedDESC();
  }

  public Page<Blog> findPagingPublicBlogs(Pageable pageable) {
    return blogRepository.findAllByPublishedAtLessThanEqualAndStatusOrderByPublishedAtDesc(LocalDateTime.now(), pageable, true);

  }


  public Page<Blog> findTop3CommentBlogs(PageRequest pageable) {
    List<Blog> blogsTop3 = blogRepository.findTop3AmountComment();
    return new PageImpl<>(blogsTop3.subList(0, 3), pageable, 2);
  }

  public Page<BlogProjection> findPublicBlogsByCategoryId(int id, int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
    log.info("test===================================");
    return blogRepository.findPublicBlogsByCategoryId(id, pageable);
  }

  public List<BlogProjection> findPublicBlogsByUserId(int id) {
    return blogRepository.findPublicBlogsByUserId(id);
  }

  public Page<Blog> getAllBlog(int page, int size) {
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
    return blogRepository.findAll(pageable);
  }


  public Blog createBlog(UpSertBlogRequest request) {
    // Validate thong tin (neu can thiet) - validation

    // TIm kiem category
    log.info("ids", request.getCategoryIds());
    Set<Category> categories = categoryRepository.findByIdIn(request.getCategoryIds());
    log.info("=============================================", categories.toString());

    Integer userId = 1;
    User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User Id not found"));
    // Tao Blog
    log.error(user.toString());
    Blog blog = Blog.builder()
            .title(request.getTitle())
            .slug(slugify.slugify(request.getTitle()))
            .content(request.getContent())
            .description(request.getDescription())
            .thumbnail(request.getThumbnail())
            .status(request.isStatus())
            .categories(categories)
            .user(user)
            .build();
    return blogRepository.save(blog);
  }


  public Blog getBlogById(Integer id) {
    return blogRepository.findById(id).orElseThrow(() -> new NotFoundException("Blog Id not found " + id));
  }

  @Transactional
  public Blog updateBlog(Integer id, UpSertBlogRequest request) {
    Blog blog = blogRepository.findById(id).orElseThrow(() -> new NotFoundException("Blog Id not found " + id));
    blog.setTitle(request.getTitle());
    blog.setSlug(request.getSlug());
    blog.setDescription(request.getDescription());
    blog.setContent(request.getContent());
    blog.setStatus(request.isStatus());
    blog.setThumbnail(request.getThumbnail());
    if (request.getCategoryIds() != null) {
      blog.setCategories(categoryRepository.findByIdIn(request.getCategoryIds()));
    }

    return blogRepository.save(blog);
  }

  @Transactional
  public void deleteById(Integer id) {
    // Xoa Blog -> xoa comment
    // Xoa blog -> xoa blog0category trong bang trung gian, khong xoa category
    Blog blog = blogRepository.findById(id).orElseThrow(() -> new NotFoundException("Blog Id not found " + id));
    blogRepository.delete(blog);
  }

  public List<Blog> findAllPublishedBlogs() {
    return blogRepository.findAllByPublishedAtLessThanEqualAndStatusOrderByPublishedAtDesc(LocalDateTime.now(), true);
  }

  public List<ResultKeyword> findByKeyword(String keyword) {
    List<ResultKeyword> result = new ArrayList<>();
    result.addAll(blogRepository.findBlogsByDescription(keyword).stream().filter(n -> !n.getResult().isEmpty()).toList());
    result.addAll(blogRepository.findBlogsByContent(keyword).stream().filter(n -> !n.getResult().isEmpty()).toList());
    result.addAll(blogRepository.findBlogsByTitle(keyword).stream().filter(n -> !n.getResult().isEmpty()).toList());

    return result;
  }

  public List<Integer> findAllIdBlogs() {
    return blogRepository.findAllIdBlogs();
  }
}
