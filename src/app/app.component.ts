import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Signup, Login, IUserInfo } from './pages/models/User';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private toastr: ToastrService) {}
  // config http
  http = inject(HttpClient);

  // state
  isLoginForm = signal<boolean>(true);
  isModalOpen = signal<boolean>(false);

  // variables
  registerPayload: Signup = {
    emailId: '',
    fullName: '',
    mobileNo: '',
    password: '',
    userId: 0,
  };
  loginPayload: Login = {
    emailId: '',
    password: '',
  };
  userInfo: any;

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  toggleForm() {
    this.isLoginForm.set(!this.isLoginForm());
  }

  toggleModal() {
    this.isModalOpen.set(!this.isModalOpen());
  }

  handleRegister() {
    this.http
      .post(
        'https://api.freeprojectapi.com/api/GoalTracker/register',
        this.registerPayload
      )
      .subscribe(
        (res) => {
          this.toggleModal();
          this.toastr.success('Your account has been sign up successfully');
        },
        (error) => {
          this.toastr.error(error.error);
        }
      );
  }

  handleLogin() {
    this.http
      .post(
        'https://api.freeprojectapi.com/api/GoalTracker/login',
        this.loginPayload
      )
      .subscribe(
        (res) => {
          localStorage.setItem('userInfo', JSON.stringify(res));
          this.userInfo = res;
          this.toggleModal();
          this.toastr.success('Login successfully');
        },
        (error) => {
          this.toastr.error(error.error);
        }
      );
  }

  handleLogout() {
    localStorage.removeItem('userInfo');
    this.userInfo = null;
    this.toastr.success('Log out successfully');
  }
}
