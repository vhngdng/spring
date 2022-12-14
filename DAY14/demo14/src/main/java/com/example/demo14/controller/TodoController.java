package com.example.demo14.controller;

import com.example.demo14.entity.Todo;
import com.example.demo14.request.CreateTodoRequest;
import com.example.demo14.request.UpdateTodoRequest;
import com.example.demo14.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TodoController {
  @Autowired
  private TodoService service;
  @GetMapping("todos")
  public List<Todo> findAll() {
    return service.findAll();
  }

  @PostMapping("todos")
  public Todo createTodo (@Valid @RequestBody CreateTodoRequest request) {
    return service.createTodo(request);
  }

  @PutMapping("todos/{id}")
  public Todo updateTodo (@Valid @PathVariable int id, @RequestBody UpdateTodoRequest todo) {
    return service.update(id, todo);

  }

  @DeleteMapping("todos/{id}")
  public void deleteTodo(@PathVariable int id) {
    service.delete(id);
  }
}
