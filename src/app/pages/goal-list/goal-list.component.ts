import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GoalService } from '../../services/goal.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-goal-list',
  imports: [DatePipe],
  templateUrl: './goal-list.component.html',
  styleUrl: './goal-list.component.scss',
})
export class GoalListComponent implements OnInit {
  router = inject(Router);
  goalSrv = inject(GoalService);
  toast = inject(ToastrService);
  goalList: any;

  ngOnInit(): void {
    this.getListGoals();
  }

  navigateToNewGoal() {
    this.router.navigateByUrl('new-goal');
  }
  getListGoals() {
    if (this.goalSrv.userInfoGlobal) {
      const userId = this.goalSrv.userInfoGlobal.userId;
      this.goalSrv.getGoalList(userId).subscribe(
        (res: any) => {
          this.toast.success('Get list success');
          this.goalList = res;
        },
        (error) => {
          this.toast.error(error.error);
        }
      );
    }
  }
}
