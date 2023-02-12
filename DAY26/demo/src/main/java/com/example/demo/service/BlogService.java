package com.example.demo.service;

import com.example.demo.dto.BlogDTO;
import com.example.demo.entity.Blog;
import com.example.demo.entity.Category;
import com.example.demo.entity.User;
import com.example.demo.exception.NotFoundException;
import com.example.demo.projection.BlogProjection;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.UpSertBlogRequest;
import com.github.slugify.Slugify;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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

  public List<BlogProjection> findAllWithCreatedDESC(){
    return blogRepository.findAllWithCreatedDESC();
  }

  public Page<Blog> findPagingPublicBlogs(Pageable pageable) {
     return blogRepository.findAllByPublishedAtLessThanEqualOrderByCreatedAtDesc(LocalDateTime.now() ,pageable);

  }


  public Page<Blog> findTop3CommentBlogs(PageRequest pageable) {
    List<Blog> blogsTop3 = blogRepository.findTop3AmountComment();
    return new PageImpl<>(blogsTop3, pageable, 2);
  }

  public List<BlogProjection> findPublicBlogsByCategoryId(int id) {
    return blogRepository.findPublicBlogsByCategoryId(id);
  }

  public List<BlogProjection> findPublicBlogsByUserId(int id) {
    return blogRepository.findPublicBlogsByUserId(id);
  }

  public List<Blog> getAllBlog() {
    return blogRepository.findAll();
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

    return  blogRepository.save(blog);
  }

  @Transactional
  public void deleteById(Integer id) {
    // Xoa Blog -> xoa comment
    // Xoa blog -> xoa blog0category trong bang trung gian, khong xoa category
    Blog blog = blogRepository.findById(id).orElseThrow(() -> new NotFoundException("Blog Id not found " + id));
    blogRepository.delete(blog);
  }

  public List<Blog> findAllPublishedBlogs() {
    return blogRepository.findAllByPublishedAtLessThanEqualOrderByPublishedAtDesc(LocalDateTime.now());
  }

  public List<Blog> findBlogsByKeywordTitle(String keyword) {
    return blogRepository.findBlogsByTitleContainingIgnoreCase(keyword);
  }
}
