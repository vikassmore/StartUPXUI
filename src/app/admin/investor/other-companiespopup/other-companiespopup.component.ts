import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-other-companiespopup',
  templateUrl: './other-companiespopup.component.html',
  styleUrls: ['./other-companiespopup.component.css']
})
export class OtherCompaniespopupComponent implements OnInit {

  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private tokenStorage: TokenStorageService, private router: Router, public formBuilder: FormBuilder) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
  }

}
