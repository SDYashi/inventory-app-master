import { Component } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { Router } from '@angular/router';

type NewType = boolean;

@Component({
  selector: 'app-inv-password-change-profile',
  templateUrl: './inv-password-change-profile.component.html',
  styleUrls: ['./inv-password-change-profile.component.css']
})
export class InvPasswordChangeProfileComponent {
isFormValid() {
throw new Error('Method not implemented.');
}
  page_data: any[] = [];
  pageSize: number = 10;
  pageCount: number | undefined;
  response_msg:string='';
isSuccess: any;
 
  constructor(private InventoryService:InventoryService, private router:Router){}
  login_user=sessionStorage.getItem('username');

  user = { password: '' };
  confirmPassword = '';
  passwordMismatch = false;  

  changeNewPassword() {
    if ( this.user.password==this.confirmPassword) {
      this.InventoryService.invDeviecs_UpdatePasswordforUserProfile(this.login_user,this.user).subscribe({
        next: (success:any) => {
            console.log(success);
            this.response_msg = success.message;
            this.isSuccess=true;
            this.user.password='';
            this.confirmPassword = '';
        },
        error: (error) => {
            console.error('Error:', error);
            this.response_msg = error.message;
            this.isSuccess=false;
        }
    });
    }
    else{
      this.response_msg="Password not Matched"
    }
  }
}
