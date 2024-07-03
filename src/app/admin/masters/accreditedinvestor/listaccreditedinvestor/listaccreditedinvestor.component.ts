import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listaccreditedinvestor',
  templateUrl: './listaccreditedinvestor.component.html',
  styleUrls: ['./listaccreditedinvestor.component.css']
})
export class ListaccreditedinvestorComponent implements OnInit {
  public accreditedList:any= [];
  public accreditedDataList:any= [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAccreditedMaster();
  }
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  public getAccreditedMaster() {
    this.appService.getAll("api/AccreditedInvestor/GetAllAccreditdInvestor").subscribe(data => {
      this.accreditedDataList = data;
      this.accreditedList = data;
    });
  }
 ///Search
 Search() {
  if (this.title == "") {
   this.getAccreditedMaster();
  }
  else {
    this.accreditedList = this.accreditedDataList.filter(res => {
      return (
        res.name.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
      );
    });
  }
}

public deleteaccrideted(accreditedinvestor: any) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: {
      title: "Confirm Action",
      message: "Are you sure you want delete this?"
    }
  });
  dialogRef.afterClosed().subscribe(dialogResult => {
    if (dialogResult) {
      const index: number = this.accreditedList.indexOf(accreditedinvestor);
      if (index !== -1) {
        this.accreditedList.splice(index, 1);
        this.appService.deleteById(`api/AccreditedInvestor?accreditedId=${accreditedinvestor.accreditedInvestorId}`, {}).subscribe(data => {
        });
      }
    }
  });
}
}
