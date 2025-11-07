import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(obj: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/GoalTracker/createTask',
      obj
    );
  }
}
