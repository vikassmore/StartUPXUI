import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listsector',
  templateUrl: './listsector.component.html',
  styleUrls: ['./listsector.component.css']
})
export class ListsectorComponent implements OnInit {
  public SectorList: any = [];
  public SectorDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSectorMaster();
  }
  //Get Sector list
  public getSectorMaster() {
    this.appService.getAllSector("api/Sector").subscribe(data => {
      this.SectorDataList = data;
      this.SectorList = data;
    });
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getSectorMaster();
    }
    else {
      this.SectorList = this.SectorDataList.filter(res => {
        return (
          res.sectorName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.subSectorName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Delete sector
  public deletesector(sector: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.SectorList.indexOf(sector);
        if (index !== -1) {
          this.SectorList.splice(index, 1);
          this.appService.deleteById(`api/Sector?sectorId=${sector.sectorId}`, {}).subscribe(data => {
          });
        }
      }
    });
  }
}
