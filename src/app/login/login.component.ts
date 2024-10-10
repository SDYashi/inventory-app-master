import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { login } from '../data-type';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  response_msg:string='';
isSuccess: any;

  constructor(private userService : UserService, private router :Router){

  }
 

  onLogin(data: login) {
    this.userService.userLogin(data).subscribe({
      next: (result: any) => {
        if (result && result.access) {
          // Decode the JWT token to get role and expiration time
          const decodedToken: any = jwtDecode(result.access);
         
          // Extract role and expiration time (exp) from the token
          const role = decodedToken.role;
          const sessionEnd = decodedToken.exp * 1000; // Convert to milliseconds
  
          // Store the token, role, and username in session storage
          sessionStorage.setItem('token', result.access);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('username', decodedToken.username); // Assuming username is stored in 'sub'
          sessionStorage.setItem('session_end', sessionEnd.toString());
          console.log('Login successful');
          // Perform any additional logic on successful login
          this.router.navigate(['home']);
          
        } else {
          // Handle case where login response is not as expected
          console.error('Unexpected login response format');
          alert('Unexpected login response format');
        }
      },
      error: (error) => {
        console.error('Login failed due to error :', error);
        if (error.status === 400 || error.status === 401){
          // Handle invalid username or password
          this.response_msg="Invalid username or password. Please try again."
          // alert('Invalid username or password. Please try again.');
          }else if (error.status === 0) {
            // Network error
             this.response_msg="Network/Server error : Please check your internet connection or Server availability"
            // alert('Network/Server error : Please check your internet connection or Server availability');
          }else if (error.status >= 400 && error.status < 500){
            // Client-side error
            if (error.error?.message) {
             alert(`Client error: ${error.error.message}`);
            } else {
                this.response_msg="Bad request: Please check the input values.'"
              // alert('Bad request: Please check the input values.');
            }
          }else if (error.status >= 500){
            // Server-side error
               this.response_msg="Server error: Something went wrong on the server. Please try again later."
            // alert('Server error: Something went wrong on the server. Please try again later.');
          }else{
            // Other unexpected errors
             this.response_msg="An unexpected error occurred. Please try again."
            // alert('An unexpected error occurred. Please try again.');
          }   
        }
      });
  }
}
