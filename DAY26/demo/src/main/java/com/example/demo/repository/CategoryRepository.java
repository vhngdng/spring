package com.example.demo.repository;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Category;
import com.example.demo.projection.CategoryProjection;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

  @Query(value = "SELECT c.*, COUNT(bc.blog_id) as used FROM category c " +
          "Inner Join blog_category bc " +
          "on c.id = bc.category_id " +
          "GROUP BY c.id " +
          "ORDER by COUNT(bc.blog_id) DESC " +
          "LIMIT 5 ", nativeQuery = true)
  List<CategoryProjection> findTop5Categories();

  Set<Category> findByIdIn(List<Integer> ids);

  Optional<Category> findByName(String name);

  @Query(value = "SELECT c.*, COUNT(bc.blog_id) as used from category c " +
          "INNER JOIN blog_category bc " +
          "on c.id = bc.category_id " +
          "GROUP BY c.id", nativeQuery = true)
  List<CategoryProjection> findCategoriesWithUsedCount();

  @Query("select c.id as id, c.name as name, count(b.id) as used from Blog b " +
          "join b.categories c " +
          "group by c.id")
  List<CategoryProjection> findAllCategories();
}