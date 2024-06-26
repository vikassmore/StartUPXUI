import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VerificationFounderModel } from '../liststartup/VerificationFounder.Model';

@Component({
  selector: 'app-gaugingdemand',
  templateUrl: './gaugingdemand.component.html',
  styleUrls: ['./gaugingdemand.component.css']
})
export class GaugingdemandComponent implements OnInit {
  public form: FormGroup;
  private sub: any;
  userId: number;
  founderVerifyId: number;
  uploadForm = new FormGroup({
    gaugingAmount: new FormControl('', [Validators.required]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private location: Location, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
    this.userId = this.data.userId;
    this.founderVerifyId = this.data.founderVerifyId;
    this.uploadForm.controls['gaugingAmount'].setValue(this.data.gaugingAmount);
  }
  //On Submit
  public onSubmit(value: Object): void {
    if (this.uploadForm.valid) {
      this.previewFounder(value);
    }
  }
  //Add Company as a preview
  public previewFounder(formdata) {
    let verificationFounderModel1: VerificationFounderModel = {
      UserId: this.userId,
      FounderVerifyId: this.founderVerifyId,
      SendForVerification: true,
      Verified: true,
      Live: false,
      GaugingAmount: formdata.gaugingAmount,
      Preview: true,
      Comment: null,
      IsActive: true,
    }
    this.appService.add('api/FounderVerification/PreviewFounder', verificationFounderModel1).subscribe((response) => {
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
