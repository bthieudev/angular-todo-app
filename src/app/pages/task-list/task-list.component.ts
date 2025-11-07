import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoalService } from '../../services/goal.service';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @ViewChild('modalCreateTask') modal!: ElementRef;
  goalSrv = inject(GoalService);
  taskSrv = inject(TaskService);
  toast = inject(ToastrService);

  taskPayload: any = {
    taskId: 0,
    taskName: '',
    description: '',
    frequency: '',
    createdDate: new Date(),
    startDate: '',
    dueDate: '',
    isCompleted: false,
    userId: 0,
  };

  constructor() {
    if (this.goalSrv.userInfoGlobal) {
      const userId = this.goalSrv.userInfoGlobal.userId;
      this.taskPayload.userId = userId;
    }
  }

  openModal() {
    if (this.modal) {
      this.modal.nativeElement.classList.remove('hidden');
    }
  }

  closeModal() {
    if (this.modal) {
      this.modal.nativeElement.classList.add('hidden');
    }
  }

  createTask() {
    this.taskSrv.createTask(this.taskPayload).subscribe(
      (res: any) => {
        console.log(res);
        this.toast.success('Create task success');
        this.closeModal();
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
}
