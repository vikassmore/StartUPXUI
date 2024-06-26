import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceProviderUserModel } from './DenyServiceUser.model';

@Component({
  selector: 'app-denyserviceuser',
  templateUrl: './denyserviceuser.component.html',
  styleUrls: ['./denyserviceuser.component.css']
})
export class DenyserviceuserComponent implements OnInit {
  public form: FormGroup;
  private sub: any;
  userId: number;
  uploadForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private location: Location, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }
  ngOnInit(): void {
    this.userId = this.data.userId;
  }
 //On Submit
 public onSubmit(value: Object): void {
  if (this.uploadForm.valid) {
    this.blockServiceuser(value);
  }
}
 //Block Service User
 public blockServiceuser(formdata) {
  let ServiceStatus: ServiceProviderUserModel = {
    userId: this.userId,
    isActive: false,
    serviceStatus: false,
    comment: formdata.comment,
  }
  this.appService.add('api/User/EditServiceStatus', ServiceStatus).subscribe((response: any) => {
    if (!Number.isNaN(response)) {
      this.closeDialog();
      this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    } else {
      this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }
  }, error => {
    this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  });
}
}
