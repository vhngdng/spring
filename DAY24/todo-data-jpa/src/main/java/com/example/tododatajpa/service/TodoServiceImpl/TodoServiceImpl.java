package com.example.tododatajpa.service.TodoServiceImpl;

import com.example.tododatajpa.entity.Todo;
import com.example.tododatajpa.exception.BadRequestException;
import com.example.tododatajpa.exception.NotFoundException;
import com.example.tododatajpa.repository.TodoRepostiory;
import com.example.tododatajpa.request.CreateTodoRequest;
import com.example.tododatajpa.request.UpdateTodoRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TodoServiceImpl {

  private final TodoRepostiory todoRepostiory;


  public long size() {
    return todoRepostiory.count();
  }

  public List<Todo> findAll() {
    return todoRepostiory.findAll();
  }

  public boolean checkTodoByTitle(String title) {
    List<Todo> todos = findAll();
    Optional<Todo> todo = todos.stream().filter(t -> t.getTitle().equals(title)).findFirst();
    return todo.isEmpty();
  }

  public Todo createTodo(CreateTodoRequest request) {
    String title = request.getTitle();
    if (checkTodoByTitle(title)) {
      log.info("test");
      return todoRepostiory.save(new Todo(title));
    } else {
      throw new BadRequestException("todo request is duplicated");
    }
  }



  public Todo findById(int id) {
    List<Todo> todos = findAll();
    return todos.stream().filter(n -> n.getId() == id).findFirst().orElseThrow(NotFoundException::new);
  }

  public Todo update(int id, UpdateTodoRequest todo) {
    // update
    if (todo.getTitle().trim().length() == 0) {
      throw new BadRequestException("Tiêu đề không được để trống");
    }
    Todo oldTodo = findById(id);
    if (todo.getTitle() != null) oldTodo.setTitle(todo.getTitle());
    oldTodo.setStatus(todo.isStatus());
    todoRepostiory.save(oldTodo);
    return findById(id);
  }

  public void delete(int id) {
    findById(id);
    todoRepostiory.deleteById(id);
  }
}
