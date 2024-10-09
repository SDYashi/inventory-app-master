import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inv-user-profile',
  templateUrl: './inv-user-profile.component.html',
  styleUrls: ['./inv-user-profile.component.css']
})
export class InvUserProfileComponent {

  
  // viewSubCategory: any[] = [];
  page_data: any[] = [];
  pageSize: number = 10;
  pageCount: number | undefined;
  user: any = {
    "first_name": '',
    "last_name": '',
    "username": '',
    "role": '',
    "employee_number": '',
    "office_name": '',
    "email": '',
    "mobile_no": ''
  };

  constructor(private InventoryService:InventoryService, private router:Router){}

  login_user=sessionStorage.getItem('username');

  ngOnInit(): void {
      this.InventoryService.invDeviecs_ViewUserProfile(this.login_user).subscribe({
          next: (success:any) => {
              console.log(success);
              this.user = success;
          },
          error: (error) => {
              console.error('Error:', error);
              alert(`Error: ${error.message}`);
          }
      });
  }
  changePassword() {
    this.router.navigate(['inventory-user-changepassword']);
  }
  

}




