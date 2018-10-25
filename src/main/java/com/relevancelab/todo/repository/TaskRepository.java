package com.relevancelab.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.relevancelab.todo.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

//	List<Task> findAllByTasknameIgnoreCase(String name);

}