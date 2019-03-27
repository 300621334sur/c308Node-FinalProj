import { Component } from '@angular/core';
import { Course } from '../../../task'
import { TaskService } from '../../services/task.service'
@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {
  tasks: Course[];

  title: string;
  author:string;
  section:string;
  isbn:string;
  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        //console.log(tasks);
        this.tasks = tasks;
      });
  }

  addTask(event) {
    event.preventDefault();
    var newTask = {
      title: this.title,
      author: this.author,
      section: this.section,
      isbn: this.isbn
  }
  
  this.taskService.addTask(newTask)
      .subscribe(task => {
          this.tasks.push(task);
          this.author = '';
          this.section = '';
          this.section = '';
          this.isbn = '';
      });

  }

  deleteTask(id){
    var tasks = this.tasks;
    
    this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0;i < tasks.length;i++){
                if(tasks[i]._id == id){
                    tasks.splice(i, 1);
                }
            }
        }
    });
}



}