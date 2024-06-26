import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-submitinterest',
  templateUrl: './submitinterest.component.html',
  styleUrls: ['./submitinterest.component.css']
})
export class SubmitinterestComponent implements OnInit {
  public form: FormGroup;
  private sub: any;
  investorUserId: number;
  founderVerifyId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private location: Location, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.investorUserId = this.data.investorUserId;
    this.founderVerifyId = this.data.founderVerifyId;
  }

}
