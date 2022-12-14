package com.example.demo14.service;

import com.example.demo14.entity.Todo;
import com.example.demo14.exception.BadRequestException;
import com.example.demo14.exception.NotFoundException;
import com.example.demo14.request.CreateTodoRequest;
import com.example.demo14.request.UpdateTodoRequest;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
  private final List<Todo> todos = new ArrayList<>();

  public TodoService() {
    todos.add(new Todo(1, "do exercise", true));
    todos.add(new Todo(2, "drink", true));
    todos.add(new Todo(3, "eat", false));
    todos.add(new Todo(4, "sleep", true));
    todos.add(new Todo(5, "relax", false));
  }

  public int size() {
    return todos.size();
  }
  public List<Todo> findAll() {
    return todos;
  }

  public boolean checkTodoByTitle(String title) {
    Optional<Todo> todo = todos.stream().filter(t -> t.getTitle().equals(title)).findFirst();
    return todo.isEmpty();
  }
  public Todo createTodo(CreateTodoRequest request) {
    Todo todo = new Todo();
    String title = request.getTitle();
    if(checkTodoByTitle(title)) {
      todo.setTitle(title);
      todo.setStatus(true);
      todo.setId(todos.get(size() - 1).getId() + 1);
      saveTodo(todo);
      return todos.get(size() - 1);
    }else {
      throw new BadRequestException("todo request is duplicated");
    }
  }

  public void saveTodo(Todo todo) {
    todos.add(todo);
  }
  public Todo findById(int id) {
    return todos.stream().filter(n -> n.getId() == id).findFirst().orElseThrow(NotFoundException::new);
  }

  public Todo update(int id, UpdateTodoRequest todo) {
    Todo oldTodo = findById(id);
    if(todo.getTitle() != null) oldTodo.setTitle(todo.getTitle());
    oldTodo.setStatus(todo.isStatus());
    return findById(id);
  }

  public void delete(int id) {
    todos.remove(findById(id));
  }
}
