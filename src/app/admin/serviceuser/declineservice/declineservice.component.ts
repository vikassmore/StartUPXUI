import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceleadModel } from '../serviceleads/ServiceLead.Model';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeclineServiceModel } from './DeclineService.Model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-declineservice',
  templateUrl: './declineservice.component.html',
  styleUrls: ['./declineservice.component.css']
})
export class DeclineserviceComponent implements OnInit {
  serviceCaseId: any;
  status: string;
  serviceId: any;
  private sub: any;
  comment: any;
  formData = new FormData();


  constructor(public dialog: MatDialog, private route: ActivatedRoute, public appService: AppService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<DeclineserviceComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any) { this.comment = ''; }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {

  }

  //Add comment
  onTextareaKeyUp(value: string) {
    this.comment = value;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
    const comment = this.comment;
    this.formData.append('comment', comment);
    // window.location.reload();
  }



}
