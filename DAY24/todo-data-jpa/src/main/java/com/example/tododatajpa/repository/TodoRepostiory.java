package com.example.tododatajpa.repository;

import com.example.tododatajpa.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepostiory extends JpaRepository<Todo, Integer> {


}
