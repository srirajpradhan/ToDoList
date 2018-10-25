package com.relevancelab.todo.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.relevancelab.todo.ResourseNotFoundException.ResourseNotFoundException;
import com.relevancelab.todo.model.Task;
import com.relevancelab.todo.repository.TaskRepository;

@Controller
@RestController
@RequestMapping("/todolist")
public class TaskController {
	
	@Autowired
	TaskRepository taskRepository;
	
	//Add or create new tasks
	@CrossOrigin(origins = "*")
	@PostMapping("/Tasks/Task")
	public Task createTask(@Valid @RequestBody Task task) {
		return taskRepository.save(task);
	}
	
	//Get All Tasks
	@CrossOrigin(origins = "*")
	@GetMapping("/Tasks/Task" )
	public List<com.relevancelab.todo.model.Task> getAllTasks(){
		return taskRepository.findAll();
	}
    
	//Get task by id
	@CrossOrigin(origins = "*")
	@GetMapping("/Tasks/Task/{id}")
	   public Task getTaskById(@PathVariable(value = "id") Long taskId) {
		   return taskRepository.findById(taskId).orElseThrow(()-> new ResourseNotFoundException("Task", "id", taskId));
    }
	
	/*@CrossOrigin(origins ="*")
	@RequestMapping(method = RequestMethod.GET, value = "/Tasks/Task/searchtask/{name}")
	public List<com.relevancelab.todo.model.Task> getAllByTaskname(@PathVariable(value="name") String name) {
		return taskRepository.findAllByTasknameIgnoreCase(name);
	} */
	
	//delete the task by id
	@CrossOrigin(origins = "*")
	@DeleteMapping("/Tasks/Task/{id}")
	   public ResponseEntity<?> deleteTask(@PathVariable(value = "id") Long taskId){
		Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourseNotFoundException("Task", "id", taskId));
		taskRepository.delete(task);
		return ResponseEntity.ok().build();
	}
	
	
	//update the task by id
	@CrossOrigin(origins = "*")
	@PutMapping("/Tasks/Task/{id}")
	public Task updateTask(@PathVariable(value = "id") Long taskId, @Valid @RequestBody Task taskDetails) {
	     Task task = taskRepository.findById(taskId)
	    		 .orElseThrow(() -> new ResourseNotFoundException("Task", "id", "taskId"));
	     task.setName(taskDetails.getName());
	      task.setDescription(taskDetails.getDescription());
	     
	     Task updateTask = taskRepository.save(task);
	     return updateTask;
	} 
}