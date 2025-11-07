import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { GoalService } from '../../services/goal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-goal',
  imports: [ReactiveFormsModule],
  templateUrl: './new-goal.component.html',
  styleUrl: './new-goal.component.scss',
})
export class NewGoalComponent {
  goalForm: FormGroup = new FormGroup({});
  goalSrv = inject(GoalService);
  toast = inject(ToastrService);
  route = inject(Router);

  constructor() {
    this.initializeForm();
    this.createNewMilestoneForm();

    if (this.goalSrv.userInfoGlobal) {
      const userId = this.goalSrv.userInfoGlobal.userId;
      this.goalForm.get('userId')?.setValue(userId);
    }
  }

  initializeForm() {
    this.goalForm = new FormGroup({
      goalId: new FormControl(0),
      goalName: new FormControl(''),
      description: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      isAchieved: new FormControl(false),
      userId: new FormControl(''),
      milestones: new FormArray([]),
    });
  }

  get milestoneList(): FormArray {
    return this.goalForm.get('milestones') as FormArray;
  }

  createNewMilestoneForm() {
    const newForm = new FormGroup({
      milestoneId: new FormControl(0),
      milestoneName: new FormControl(''),
      description: new FormControl(''),
      isCompleted: new FormControl(false),
      targetDate: new FormControl(''),
    });
    this.milestoneList.push(newForm);
  }

  removeMilestone(index: number) {
    this.milestoneList.removeAt(index);
  }

  handleCreateNewGoal() {
    const formValue = this.goalForm.value;
    this.goalSrv.saveGoal(formValue).subscribe(
      (res: any) => {
        this.toast.success('Create success');
        this.route.navigateByUrl('goals');
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
}
