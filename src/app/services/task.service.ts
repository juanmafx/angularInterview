import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Task { id?: number; title: string; description?: string; status: 'pending'|'in_progress'|'completed'; }
@Injectable({ providedIn: 'root' })
export class TaskService {
  private api = 'http://localhost:8000/api/tasks';
  constructor(private http: HttpClient) {}
  getTasks(): Observable<Task[]> { return this.http.get<Task[]>(this.api); }
  createTask(task: Partial<Task>): Observable<Task> { return this.http.post<Task>(this.api, task); }
  updateTask(id: number, task: Partial<Task>): Observable<Task> { return this.http.put<Task>(`${this.api}/${id}`, task); }
  deleteTask(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }
}
