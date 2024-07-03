import { Component, OnInit } from '@angular/core';
import { AppService, Data } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SectorModel } from '../listsector/Sector.Model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-editsector',
  templateUrl: './editsector.component.html',
  styleUrls: ['./editsector.component.css']
})
export class EditsectorComponent implements OnInit {
  private sub: any;
  sectorId: string | any;
  userId: string | any;
  sectorName: string | any;
  subSectorName: string | any;
  sectorDescription: string | any;
  uploadForm = new FormGroup({
    sectorName: new FormControl('', [Validators.required]),
    subSectorName: new FormControl('', [Validators.required]),
    sectorDescription: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    isActive: new FormControl(true)
  });
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router,private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.sub = this.route.params.subscribe(params => {
      this.sectorId = params['id'];
      if (this.sectorId != undefined || this.sectorId > 0) {
        this.getsectorById(this.sectorId);
      }
    });
  }
  //Validation
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  ///Get Service By ServiceId
  getsectorById(sectorId): void {
    this.appService.getById('api/Sector/GetSectorById/', sectorId).subscribe((data: any) => {
      this.uploadForm.controls['sectorName'].setValue(data.sectorName);
      this.uploadForm.controls['subSectorName'].setValue(data.subSectorName);
      this.uploadForm.controls['sectorDescription'].setValue(data.sectorDescription);
      this.uploadForm.controls['isActive'].setValue(data.isActive);
      this.uploadForm.controls['sectorId'].setValue(data.sectorId);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Submit
  public onSectorSubmit(value: Object): void {
    this.updateSector(value);
  }

  ////Update Sector Record
  private updateSector = (sectorFormData) => {
    var sectorId = Number(this.sectorId);
    let sectorModel1: SectorModel = {
      sectorId: sectorId,
      sectorName: sectorFormData.sectorName,
      subSectorName: sectorFormData.subSectorName,
      sectorDescription: sectorFormData.sectorDescription,
      loggedUserId: this.userId,
      isActive: true
    }
    this.appService.edit('api/Sector/Edit', sectorModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listsector'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }

}
