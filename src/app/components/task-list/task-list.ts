import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:600px;margin:2rem auto;font-family:sans-serif">
      <h1>Task Manager</h1>
      <div style="display:flex;gap:8px;margin-bottom:1rem">
        <input [(ngModel)]="newTitle" placeholder="Task title" style="flex:1;padding:8px;border:1px solid #ccc;border-radius:4px" />
        <button (click)="addTask()" style="padding:8px 16px;background:#4f46e5;color:white;border:none;border-radius:4px;cursor:pointer">Add</button>
      </div>
      <div *ngFor="let task of tasks" style="display:flex;align-items:center;justify-content:space-between;padding:12px;margin-bottom:8px;border:1px solid #e5e7eb;border-radius:8px">
        <div>
          <strong>{{ task.title }}</strong>
          <span style="margin-left:8px;padding:2px 8px;border-radius:12px;font-size:12px"
            [style.background]="task.status==='completed'?'#d1fae5':task.status==='in_progress'?'#fef3c7':'#e0e7ff'">
            {{ task.status }}
          </span>
        </div>
        <div style="display:flex;gap:4px">
          <button (click)="cycleStatus(task)" style="padding:4px 8px;border:1px solid #ccc;border-radius:4px;cursor:pointer">Status</button>
          <button (click)="deleteTask(task.id!)" style="padding:4px 8px;background:#ef4444;color:white;border:none;border-radius:4px;cursor:pointer">Delete</button>
        </div>
      </div>
      <p *ngIf="tasks.length===0" style="color:#9ca3af">No tasks yet.</p>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  constructor(private taskService: TaskService) {}
  ngOnInit() { this.loadTasks(); }
  loadTasks() { this.taskService.getTasks().subscribe(t => this.tasks = t); }
  addTask() {
    if (!this.newTitle.trim()) return;
    this.taskService.createTask({ title: this.newTitle, status: 'pending' }).subscribe(() => { this.newTitle = ''; this.loadTasks(); });
  }
  cycleStatus(task: Task) {
    const next: Record<string,string> = { pending: 'in_progress', in_progress: 'completed', completed: 'pending' };
    this.taskService.updateTask(task.id!, { status: next[task.status] as Task['status'] }).subscribe(() => this.loadTasks());
  }
  deleteTask(id: number) { this.taskService.deleteTask(id).subscribe(() => this.loadTasks()); }
}
