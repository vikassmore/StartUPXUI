import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listfounderdetails',
  templateUrl: './listfounderdetails.component.html',
  styleUrls: ['./listfounderdetails.component.css']
})
export class ListfounderdetailsComponent implements OnInit {
  public items: any;
  userId: string | any;
  founderId: string | any;
  public founderdetail: any = [];
  public founderdetailData: any = [];
  public title: any;
  public page: any;
  public count = 10;
  uploadForm = new FormGroup({
    founderId: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    description: new FormControl('', [Validators.required]),
  })

  isAddMode!: boolean;
  submitted = false;
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private tokenStorage: TokenStorageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    if (this.userId != undefined || this.userId > 0) {
      this.getFounderList(this.userId);
    }
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getFounderList(this.userId);
    }
    else {
      this.founderdetail = this.founderdetailData.filter(res => {
        return (
          res.firstName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.lastName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.emailId.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get founder list
  public getFounderList(userId): void {
    this.appService.getAllById("api/FounderDetail/GetAllFounderbyuserId/", userId).subscribe(data => {
      this.founderdetailData = data;
      this.founderdetail = data;
    });
  }




  public deletefounder(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.founderdetail.indexOf(item);
        if (index !== -1) {
          this.founderdetail.splice(index, 1);
          this.appService.deleteById(`api/FounderDetail?founderId=${item.founderId}`, {}).subscribe(data => {
            window.location.reload();
          });
        }
      }
    });
  }


}
