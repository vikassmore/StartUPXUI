import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorModel } from '../listsector/Sector.Model';

@Component({
  selector: 'app-addsector',
  templateUrl: './addsector.component.html',
  styleUrls: ['./addsector.component.css']
})
export class AddsectorComponent implements OnInit {
  public form: FormGroup;
  sectorId: string | any;
  private sub: any;

  uploadForm = new FormGroup({
    sectorName: new FormControl('', [Validators.required]),
    subSectorName: new FormControl('', [Validators.required]),
    sectorDescription: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    isActive: new FormControl(true)
  });

  isAddMode!: boolean;
  submitted = false;


  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sectorId = this.route.snapshot.params['id'];
    this.isAddMode = !this.sectorId;
  }
  //On Submit
  public onSectorSubmit(value: Object): void {
    if (this.isAddMode) {
      this.addSector(value);
    }
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

  ////Add Service record
  private addSector = (sectorFormData) => {
    if (this.sectorId == null) {
      sectorFormData.sectorId = 0;
      let SectorModel1: SectorModel = {
        sectorId: sectorFormData.sectorId,
        sectorName: sectorFormData.sectorName,
        subSectorName: sectorFormData.subSectorName,
        sectorDescription: sectorFormData.sectorDescription,
        isActive: true

      }
      console.log("as", sectorFormData)
      this.appService.add('api/Sector', SectorModel1).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listsector'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}


