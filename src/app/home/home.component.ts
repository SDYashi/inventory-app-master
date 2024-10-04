import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{
 
  sessionTime: string = '';
  sessionuser: any = '';

  constructor(private authService:AuthService){
    
  }
  ngOnInit(): void {
    this.sessionuser=sessionStorage.getItem('username');
    this.initializeSidebarToggle();
    this.authService.sessionTime$.subscribe((remainingTime) => {
      this.sessionTime = this.formatTime(remainingTime);
    });
  }

  // Method to format time in MM:SS format
  private formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }


  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }



  //* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
logout(){
  this.authService.logout();
}


initializeSidebarToggle(): void {
  document.getElementById('sidebarCollapse')?.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sidebar?.classList.toggle('collapsed');
    content?.classList.toggle('collapsed');
  });
}


}

