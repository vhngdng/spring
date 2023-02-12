package com.example.tododatajpa.controller;

import com.example.tododatajpa.entity.Todo;
import com.example.tododatajpa.request.CreateTodoRequest;
import com.example.tododatajpa.request.UpdateTodoRequest;
import com.example.tododatajpa.service.TodoServiceImpl.TodoServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TodoController {
  @Autowired
  private TodoServiceImpl service;

  @GetMapping("/todos")
  public List<Todo> findAll() {
    return service.findAll();
  }

  @PostMapping("/todos")
  public Todo createTodo (@Valid @RequestBody CreateTodoRequest request) {
    return service.createTodo(request);
  }

  @PutMapping("/todos/{id}")
  public Todo updateTodo (@Valid @PathVariable int id, @RequestBody UpdateTodoRequest todo) {
    return service.update(id, todo);
  }

  @DeleteMapping("/todos/{id}")
  public void deleteTodo(@PathVariable int id) {
    service.delete(id);
  }
}
