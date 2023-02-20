package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.exception.DuplicateException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.projection.CategoryProjection;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.request.UpSertCategoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;
  @Autowired
  private BlogRepository blogRepository;

  public List<CategoryProjection> findTop5Categories() {
    return categoryRepository.findTop5Categories();
  }

  public List<CategoryProjection> findAll() {
    return categoryRepository.findAllCategories();
  }

  public Category createCategory(UpSertCategoryRequest request) {
    if(checkDuplicateName(request.getName())) {
      throw new DuplicateException("The category name is duplicated, " + request.getName());
    }
    return categoryRepository.save(new Category(request.getName()));
  }

  public Category getCategoryById(Integer id) {
    return categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Id is not valid " + id));
  }

  public boolean checkDuplicateName(String name) {
    return categoryRepository.findByName(name).isPresent();
  }
    public Category updateCategory (Integer id, UpSertCategoryRequest request){
      Category oldCategory = getCategoryById(id);
      if(checkDuplicateName(request.getName())) {
        throw new DuplicateException("The category name is duplicated, " + request.getName());
      }
      oldCategory.setName(request.getName());
      return categoryRepository.save(oldCategory);
    }


  public void deleteById(Integer id) {
    Category category = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Category Id not found " + id));
    blogRepository.findAll().forEach(blog -> blog.getCategories().remove(category));
    categoryRepository.delete(category);

  }

  public List<CategoryProjection> findAllWithUsedCount() {
    return categoryRepository.findCategoriesWithUsedCount();
  }


}
