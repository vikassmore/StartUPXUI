import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserForAuthenticationDto } from 'src/app/interfaces/user/UserForAuthenticationDto.model';

import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {
  userId: string;

  constructor(public appService: AppService, private _router: Router,
    private _route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {
      this.userId = params.get('UserId');
    }
    );
    if (this.userId != null && this.userId != undefined) {
      this.IsValidAccount(this.userId);
    }
  }
  /**
     * Check Query string parameter against user record and verify users account.
     */
  IsValidAccount = (UserId) => {
    const model = {
      EncryptedUserId: UserId,
    };
    this.appService.add(`api/User/ActiveUser`, model).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open("User Activated Successfully.", '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this._router.navigate(['/']);
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });

  }

}
