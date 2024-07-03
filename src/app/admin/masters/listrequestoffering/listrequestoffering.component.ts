import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
@Component({
  selector: 'app-listrequestoffering',
  templateUrl: './listrequestoffering.component.html',
  styleUrls: ['./listrequestoffering.component.css']
})
export class ListrequestofferingComponent implements OnInit {
  RequestOfferingList: [];
  public page: any;
  public count = 10;
  formType: string | any;
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router, private _authService: AuthenticationService, public formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.formType = this.route.snapshot.params['id'];
    this.getAllRequestOfferingDetails();
  }
  public getAllRequestOfferingDetails() {
    this.appService.getAll("api/InvestorVerification/GetAllRequestOfferDetails").subscribe(data => {
      
      this.RequestOfferingList = data.map(p => ({
        investorName: p.investorName,
        verified: p.verified,
        userId:p.userId,
        investorId:p.investorId,
        investorVerifiedId:p.investorVerifiedId,
        founderVerifiedId:p.founderVerifiedId,
        startupDeatailModel: {
          startupId: p.startupDeatailModel.startupId,
          startUpName: p.startupDeatailModel.startUpName,
          address: p.startupDeatailModel.address,
          foundingYear: p.startupDeatailModel.foundingYear,
          previewUrl: this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + p.startupDeatailModel.logo),
          logoFileName: p.startupDeatailModel.logoFileName,
          sectorId: p.startupDeatailModel.sectorId,
          sectorName: p.startupDeatailModel.sectorName,
        }
      }));
    });
  }
  
  
}
