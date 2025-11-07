import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router);
  goalSrv = inject(GoalService);
  goalList: any;

  ngOnInit(): void {
    this.getListGoals();
  }

  navigateToTask() {
    this.router.navigateByUrl('tasks');
  }

  navigateToGoal() {
    this.router.navigateByUrl('goals');
  }

  getListGoals() {
    if (this.goalSrv.userInfoGlobal) {
      const userId = this.goalSrv.userInfoGlobal.userId;
      this.goalSrv.getGoalList(userId).subscribe(
        (res: any) => {
          this.goalList = res;
        },
        (error) => {
          console.log(error.error);
        }
      );
    }
  }
}
