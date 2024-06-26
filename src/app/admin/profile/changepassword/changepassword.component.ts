import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ChangePasswordModel } from './ChangePassword.Model';
import { Enum } from './Enum';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  userId: string | any;
  password: string;
  roleId: string;
  confirmPassword: string;
  uploadForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });
  constructor(public appService: AppService,
    public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService) {
    this.uploadForm = this.formBuilder.group({
      newPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
        Validators.minLength(6),
        Validators.maxLength(10)
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    },
      { validator: matchingPasswords('newPassword', 'confirmPassword') });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.roleId = this.tokenStorage.getUser().roleId;
  }
  public onSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      if (this.password == this.confirmPassword) {
        this.addNewPassword(value);
      }
    }
  }
  public backButtonClick() {
    if (this.roleId == Enum.RoleId.Satrtup) {
      this.router.navigate(['/admin/startup/dashboardstartup']);
    }
    else if (this.roleId == Enum.RoleId.Investor) {
      this.router.navigate(['/admin/investor/dashboardinvestor']);
    }
    else if (this.roleId == Enum.RoleId.Admin) {
      this.router.navigate(['/admin/dashboard-menu/dash-board']);
    }
    else if (this.roleId == Enum.RoleId.Service) {
      this.router.navigate(['/admin/serviceuser/dashboardserviceuser']);
    }
  }
  //Change password
  private addNewPassword = (formData) => {
    let changePasswordModel1: ChangePasswordModel = {
      userId: this.userId,
      newPassword: formData.newPassword,
    }
    this.appService.addUser('api/User/ChangePassword', changePasswordModel1).subscribe((data: any) => {
      if (!Number.isNaN(data)) {
        this.snackBar.open(data.message, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        if (data.roleId == Enum.RoleId.Admin) {
          this.router.navigate(['/admin/dashboard-menu/dash-board'], { relativeTo: this.route });
        } else if (data.roleId == Enum.RoleId.Satrtup) {
          this.router.navigate(['/admin/startup/dashboardstartup'], { relativeTo: this.route });
        } else if (data.roleId == Enum.RoleId.Investor) {
          this.router.navigate(['/admin/investor/dashboardinvestor'], { relativeTo: this.route });
        } else if (data.roleId == Enum.RoleId.Service) {
          this.router.navigate(['/admin/serviceuser/dashboardserviceuser'], { relativeTo: this.route });
        }
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
