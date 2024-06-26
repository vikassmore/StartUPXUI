import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/UserForAuthenticationDto.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ResetPasswordModel } from './ResetPassword.Model';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  hide = true;
  private sub: any;
  isAddMode!: boolean;
  userId: any;
  uploadForm = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(public formBuilder: FormBuilder, public router: Router, public snackBar: MatSnackBar, public appservice: AppService, private token: TokenStorageService,
    private route: ActivatedRoute) {
    this.uploadForm = this.formBuilder.group({

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    },
      { validator: matchingPasswords('password', 'confirmPassword') });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });
    this.userId = this.route.snapshot.params['userId'];
    this.isAddMode = !this.userId;
  }
  //On Submit
  public onSubmit() {
    this.resetPassword();
  }
  //Reset password
  private resetPassword() {
    let formData: ResetPasswordModel = {
      userId: this.userId,
      password: this.uploadForm.value.password,
      confirmPassword: this.uploadForm.value.confirmPassword
    }
    if (this.uploadForm.valid) {
      this.appservice.resetPassword('api/User/ForgotPassword', formData).subscribe((response: any) => {
        this.snackBar.open('Password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/']);
      }, error => {
        this.snackBar.open('Password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/']);
      });
    }
  }

}
