import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  userInfoGlobal: any;

  constructor(private http: HttpClient) {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      const userInfoParse = JSON.parse(userInfo);
      this.userInfoGlobal = userInfoParse;
    }
  }

  saveGoal(obj: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/GoalTracker/createGoalWithMilestones',
      obj
    );
  }

  getGoalList(userId: number) {
    return this.http.get(
      `https://api.freeprojectapi.com/api/GoalTracker/getAllGoalsByUser?userId=${userId}`
    );
  }
}
