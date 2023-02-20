package com.example.demo.repository;

import com.example.demo.dto.BlogDTO;
import com.example.demo.entity.Blog;
import com.example.demo.entity.Category;
import com.example.demo.projection.BlogProjection;
import com.example.demo.projection.ResultKeyword;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import javax.print.DocFlavor;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {

  @Query(value = "select b.id as id, b.title as title, b.slug as slug, " +
          "b.description as description, b.thumbnail as thumbnail, b.createdAt as createdAt, " +
          "u.id as userId, u.name as userName, " +
          "c.id as categoryId, c.name as categoryName, " +
          "count(com.id) as countComment from Blog b " +
          "left join User u " +
          "on u.id  = b.id " +
          "left join Category c " +
          "on c.id = b.id " +
          "left join Comment com " +
          "on com.blog.id = b.id " +
          "where b.status = true " +
          "group by b.id " +
          "order by b.createdAt DESC ")
  List<BlogProjection> findAllWithCreatedDESC();

  List<Blog> findAllByPublishedAtLessThanEqualAndStatusOrderByPublishedAtDesc(LocalDateTime time, boolean status);


  @Query(value = "select b from Blog b where b.publishedAt is not null order by b.createdAt desc ")
  List<Blog> findAllPublicBlogs();

  @Query(value =
//          "select b.id as id, b.title as title, b.thumbnail as thumbnail, b.slug as slug, b.publishedAt as publishedAt, b.createdAt as createdAt, " +
//          "b.description as description, b.user.id as userId, b.user.name as userName, b.categories as categories, count (com.id) as countComment from Blog b " +
//          "inner join Comment com " +
//          "on b.id = com.blog.id " +
//          "group by b.id " +
//          "order by count (com.id) DESC , b.createdAt DESC "
          ////////////////////////////////////////////////////////////
          "select b, count (c.id) as countComment from Blog b " +
                  "left join Comment c " +
                  "on b.id = c.blog.id " +
                  "group by b.id " +
                  "having b.status = true " +
                  "order by count (c.id) DESC , b.publishedAt DESC "
  )
  List<Blog> findTop3AmountComment();

  @Query(value = "select b.id as id, b.title as title, b.thumbnail as thumbnail, b.slug as slug, b.status as status, " +
          "b.description as description, b.content as content, b.createdAt as createdAt, b.publishedAt as publishedAt, " +
          "COUNT(com.id) as countComment, " +
          "b.user.id as userId, b.user.name as userName, " +
          "c.id as categoryId, c.name as categoryName " +
          "from Blog b " +
          "join b.user u " +
          "join b.categories c " +
          "left join b.comments com " +
          "where c.id = :id " +
          "and status = true " +
          "and publishedAt is not null " +
          "group by b.id " +
          "order by publishedAt ")
  Page<BlogProjection> findPublicBlogsByCategoryId(@Param("id") int id, Pageable paging);

  @Query(value = "select b.*, count(com.id) as countComment, " +
          "u.id as userId, u.name as userName, " +
          "c.id as categoryId, c.name as categoryName " +
          "from blog b " +
          "JOIN `user` u " +
          "on b.user_id = u.id " +
          "left join category c " +
          "on c.id = b.id " +
          "left join comment com " +
          "on com.blog_id = b.id " +
          "WHERE b.user_id  = :id " +
          "group by (b.id)", nativeQuery = true)
  List<BlogProjection> findPublicBlogsByUserId(@Param("id") int id);

  Page<Blog> findAllByPublishedAtLessThanEqualAndStatusOrderByPublishedAtDesc(LocalDateTime time, Pageable pageable, boolean status);
  @Query(value = "select b.id as id, b.title as result, b.slug as slug from Blog b where b.title like lower(concat('%', ?1,'%'))")
  List<ResultKeyword> findBlogsByTitle( String keyword);
  @Query("select b.id as id, b.description as result, b.slug as slug from Blog b where b.description like %:keyword%")
  List<ResultKeyword> findBlogsByDescription(@Param("keyword") String keyword);

  @Query("select b.id as id, b.content as result, b.slug as slug from Blog b where b.content like lower(concat('%', :keyword,'%'))")
  List<ResultKeyword> findBlogsByContent(@Param("keyword") String keyword);
//  @Query("select b.id as id, b.content as result1, b.description as result2, b.title as result3 from Blog b where b.content like %?1% or b.description like %?1% or b.title like %?1%")
//  List<ResultKeyword> findByKeyWord(String keyword);
  @Query("select b.id from Blog b")
  List<Integer> findAllIdBlogs();

}

//